#!/usr/bin/env node

import { installSkill, formatStatus, getStatus } from '../lib/installer.mjs';

const args = process.argv.slice(2);
const command = args[0] && !args[0].startsWith('-') ? args[0] : 'install';
const json = args.includes('--json');
const quiet = args.includes('--quiet');

function optionValue(name) {
  const index = args.indexOf(name);
  return index >= 0 ? args[index + 1] : undefined;
}

function printHelp() {
  process.stdout.write(`crm-skill-installer

用法：
  crm-skill install [--home <目录>] [--json] [--quiet]
  crm-skill status  [--home <目录>] [--json]
  crm-skill doctor  [--home <目录>] [--json]

安装位置：
  ~/.agents/skills/crm          共享真源
  ~/.codex/skills/crm           Codex 桥接链接
  ~/.claude/skills/crm          Claude Code 桥接链接

环境变量：
  CRM_SKILL_SKIP_AUTO_INSTALL=1  跳过 npm postinstall 自动安装
`);
}

try {
  const home = optionValue('--home');

  if (command === 'help' || args.includes('--help') || args.includes('-h')) {
    printHelp();
  } else if (command === 'install') {
    if (process.env.CRM_SKILL_SKIP_AUTO_INSTALL === '1') {
      if (!quiet) process.stdout.write('已按 CRM_SKILL_SKIP_AUTO_INSTALL=1 跳过自动安装。\n');
    } else {
      const result = installSkill({ home });
      if (!quiet) {
        process.stdout.write(json ? `${JSON.stringify(result, null, 2)}\n` : `${formatStatus(result.status)}\n`);
        if (result.backupPath) process.stdout.write(`旧版本备份：${result.backupPath}\n`);
      }
    }
  } else if (command === 'status' || command === 'doctor') {
    const status = getStatus({ home });
    process.stdout.write(json ? `${JSON.stringify(status, null, 2)}\n` : `${formatStatus(status)}\n`);
    if (command === 'doctor' && !status.healthy) process.exitCode = 1;
  } else {
    process.stderr.write(`未知命令：${command}\n\n`);
    printHelp();
    process.exitCode = 2;
  }
} catch (error) {
  process.stderr.write(`CRM skill 安装失败：${error.message}\n`);
  process.exitCode = 1;
}
