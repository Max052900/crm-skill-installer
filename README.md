# CRM Skill Installer

通过 npm 或 npm exec，把对公客户经理 `crm` skill 安装到 Codex 与 Claude Code。

## 一条命令安装

安装固定版本：

```bash
npm install -g github:Max052900/crm-skill-installer#v1.0.0
```

安装后验证：

```bash
crm-skill doctor
```

不想保留全局 npm 包，可以直接执行：

```bash
npm exec --yes \
  --package=github:Max052900/crm-skill-installer#v1.0.0 \
  -- crm-skill install
```

## 安装位置

```text
~/.agents/skills/crm          共享真源
~/.codex/skills/crm           Codex 桥接链接
~/.claude/skills/crm          Claude Code 桥接链接
```

安装器要求 Node.js 18 或更高版本，无第三方运行时依赖。

重复安装相同内容不会改写真源。发现不同版本时，旧 skill 会先备份到：

```text
~/.agents/skills/.backups/
```

## 常用命令

```bash
crm-skill install
crm-skill status
crm-skill status --json
crm-skill doctor
```

跳过 npm 安装阶段的自动落位：

```bash
CRM_SKILL_SKIP_AUTO_INSTALL=1 \
  npm install -g github:Max052900/crm-skill-installer#v1.0.0
```

## 更新

新版本发布后，使用新标签覆盖安装：

```bash
npm install -g github:Max052900/crm-skill-installer#v1.1.0
```

## 开发验证

```bash
npm test
npm pack
```

公开仓库只包含规则、脱敏合成样板和安装代码，不包含客户征信、流水、证件、原始案件目录或本机绝对路径。

该仓库设置为 `private: true` 仅用于阻止误发布至公共 npm registry，不影响从 GitHub 安装。
