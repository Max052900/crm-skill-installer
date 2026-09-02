import {
  cpSync,
  existsSync,
  lstatSync,
  mkdirSync,
  readFileSync,
  readlinkSync,
  readdirSync,
  realpathSync,
  renameSync,
  rmSync,
  symlinkSync,
} from 'node:fs';
import { createHash } from 'node:crypto';
import { dirname, join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import os from 'node:os';

const packageRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const defaultPayloadDir = join(packageRoot, 'payload', 'crm');

function pathExists(path) {
  try {
    lstatSync(path);
    return true;
  } catch (error) {
    if (error.code === 'ENOENT') return false;
    throw error;
  }
}

function validateSkill(path) {
  const skillFile = join(path, 'SKILL.md');
  if (!existsSync(skillFile)) throw new Error(`缺少 ${skillFile}`);
  const text = readFileSync(skillFile, 'utf8');
  const frontmatter = text.match(/^---\n([\s\S]*?)\n---/);
  if (!frontmatter || !/^name:\s*crm\s*$/m.test(frontmatter[1])) {
    throw new Error(`${skillFile} 的 YAML frontmatter 未声明 name: crm`);
  }
  return true;
}

function collectFiles(root, current = root) {
  const files = [];
  for (const entry of readdirSync(current, { withFileTypes: true }).sort((a, b) => a.name.localeCompare(b.name))) {
    if (entry.name === '.DS_Store') continue;
    const path = join(current, entry.name);
    if (entry.isDirectory()) files.push(...collectFiles(root, path));
    else if (entry.isFile()) files.push(path);
  }
  return files;
}

export function directoryDigest(root) {
  validateSkill(root);
  const hash = createHash('sha256');
  for (const file of collectFiles(root)) {
    hash.update(relative(root, file));
    hash.update('\0');
    hash.update(readFileSync(file));
    hash.update('\0');
  }
  return hash.digest('hex');
}

function timestamp() {
  return new Date().toISOString().replace(/[:.]/g, '-');
}

function bridgeState(bridge, target) {
  if (!pathExists(bridge)) return { path: bridge, state: 'missing', resolvesToTarget: false };
  const stat = lstatSync(bridge);
  if (!stat.isSymbolicLink()) return { path: bridge, state: 'not-symlink', resolvesToTarget: false };
  const link = readlinkSync(bridge);
  const resolved = resolve(dirname(bridge), link);
  let resolvesToTarget = false;
  try {
    resolvesToTarget = realpathSync(resolved) === realpathSync(target);
  } catch {
    resolvesToTarget = false;
  }
  return { path: bridge, state: 'symlink', link, resolvesToTarget };
}

function ensureBridge(bridge, target, backupRoot) {
  const current = bridgeState(bridge, target);
  if (current.resolvesToTarget) return current;

  mkdirSync(dirname(bridge), { recursive: true });
  if (pathExists(bridge)) {
    mkdirSync(backupRoot, { recursive: true });
    const hostName = dirname(bridge).split('/').pop().replace(/^\./, '');
    renameSync(bridge, join(backupRoot, `crm-${hostName}-${timestamp()}-${process.pid}`));
  }
  symlinkSync(relative(dirname(bridge), target), bridge, 'dir');
  return bridgeState(bridge, target);
}

function pathsFor(home) {
  const resolvedHome = resolve(home ?? os.homedir());
  const target = join(resolvedHome, '.agents', 'skills', 'crm');
  return {
    home: resolvedHome,
    target,
    backupRoot: join(resolvedHome, '.agents', 'skills', '.backups'),
    bridges: [
      join(resolvedHome, '.codex', 'skills', 'crm'),
      join(resolvedHome, '.claude', 'skills', 'crm'),
    ],
  };
}

export function getStatus({ home, payloadDir = defaultPayloadDir } = {}) {
  const paths = pathsFor(home);
  const payloadValid = pathExists(payloadDir) && validateSkill(payloadDir);
  const installed = pathExists(paths.target);
  let installedValid = false;
  let payloadDigest = null;
  let installedDigest = null;

  if (payloadValid) payloadDigest = directoryDigest(payloadDir);
  if (installed) {
    try {
      installedValid = validateSkill(paths.target);
      installedDigest = directoryDigest(paths.target);
    } catch {
      installedValid = false;
    }
  }

  const bridges = paths.bridges.map((bridge) => bridgeState(bridge, paths.target));
  const payloadMatches = installedValid && payloadDigest === installedDigest;
  return {
    healthy: Boolean(payloadValid && installedValid && payloadMatches && bridges.every((bridge) => bridge.resolvesToTarget)),
    home: paths.home,
    target: paths.target,
    payloadValid,
    installed,
    installedValid,
    payloadMatches,
    payloadDigest,
    installedDigest,
    bridges,
  };
}

export function installSkill({ home, payloadDir = defaultPayloadDir } = {}) {
  validateSkill(payloadDir);
  const paths = pathsFor(home);
  const before = getStatus({ home: paths.home, payloadDir });
  mkdirSync(dirname(paths.target), { recursive: true });

  let backupPath = null;
  let changed = false;
  if (!before.payloadMatches) {
    const stage = join(dirname(paths.target), `.crm-install-${process.pid}-${Date.now()}`);
    rmSync(stage, { recursive: true, force: true });
    cpSync(payloadDir, stage, { recursive: true, preserveTimestamps: true });
    validateSkill(stage);

    if (pathExists(paths.target)) {
      mkdirSync(paths.backupRoot, { recursive: true });
      backupPath = join(paths.backupRoot, `crm-${timestamp()}-${process.pid}`);
      renameSync(paths.target, backupPath);
    }
    renameSync(stage, paths.target);
    changed = true;
  }

  for (const bridge of paths.bridges) ensureBridge(bridge, paths.target, paths.backupRoot);
  const status = getStatus({ home: paths.home, payloadDir });
  if (!status.healthy) throw new Error('安装后自检未通过');
  return { changed, backupPath, status };
}

export function formatStatus(status) {
  const lines = [
    `CRM skill：${status.healthy ? '已安装且健康' : '需要修复'}`,
    `共享真源：${status.target}`,
    `内容一致：${status.payloadMatches ? '是' : '否'}`,
  ];
  for (const bridge of status.bridges) {
    lines.push(`${bridge.path}：${bridge.resolvesToTarget ? '已连接' : bridge.state}`);
  }
  return lines.join('\n');
}
