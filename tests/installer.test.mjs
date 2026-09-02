import assert from 'node:assert/strict';
import { appendFileSync, existsSync, mkdtempSync, readFileSync, readlinkSync, rmSync } from 'node:fs';
import os from 'node:os';
import { dirname, join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import test from 'node:test';
import { getStatus, installSkill } from '../lib/installer.mjs';

const packageRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const payloadDir = join(packageRoot, 'payload', 'crm');

test('GitHub 安装包不使用 postinstall 写入用户目录', () => {
  const packageJson = JSON.parse(readFileSync(join(packageRoot, 'package.json'), 'utf8'));
  assert.equal(packageJson.scripts?.postinstall, undefined);
  assert.equal(packageJson.bin?.['crm-skill'], 'bin/crm-skill.mjs');

  const readme = readFileSync(join(packageRoot, 'README.md'), 'utf8');
  assert.match(readme, /releases\/download\/v1\.0\.2\/crm-skill-installer-1\.0\.2\.tgz/);
  assert.doesNotMatch(readme, /(?:--package=|install -g )github:/);
});

test('安装 CRM skill，并为 Codex 与 Claude Code 创建共享桥接', () => {
  const home = mkdtempSync(join(os.tmpdir(), 'crm-skill-install-'));
  try {
    const first = installSkill({ home, payloadDir });
    assert.equal(first.changed, true);
    assert.equal(first.status.healthy, true);
    assert.match(readFileSync(join(home, '.agents', 'skills', 'crm', 'SKILL.md'), 'utf8'), /name:\s*crm/);

    const target = join(home, '.agents', 'skills', 'crm');
    for (const bridge of [join(home, '.codex', 'skills', 'crm'), join(home, '.claude', 'skills', 'crm')]) {
      assert.equal(readlinkSync(bridge), relative(dirname(bridge), target));
    }

    const second = installSkill({ home, payloadDir });
    assert.equal(second.changed, false);
    assert.equal(second.backupPath, null);
    assert.equal(getStatus({ home, payloadDir }).healthy, true);
  } finally {
    rmSync(home, { recursive: true, force: true });
  }
});

test('升级不同内容时先备份旧 skill，再恢复为安装包内容', () => {
  const home = mkdtempSync(join(os.tmpdir(), 'crm-skill-upgrade-'));
  try {
    installSkill({ home, payloadDir });
    const installedSkill = join(home, '.agents', 'skills', 'crm', 'SKILL.md');
    appendFileSync(installedSkill, '\n本地临时改动\n');

    const upgraded = installSkill({ home, payloadDir });
    assert.equal(upgraded.changed, true);
    assert.ok(upgraded.backupPath);
    assert.equal(existsSync(upgraded.backupPath), true);
    assert.match(readFileSync(join(upgraded.backupPath, 'SKILL.md'), 'utf8'), /本地临时改动/);
    assert.doesNotMatch(readFileSync(installedSkill, 'utf8'), /本地临时改动/);
    assert.equal(upgraded.status.healthy, true);
  } finally {
    rmSync(home, { recursive: true, force: true });
  }
});
