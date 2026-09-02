# CRM Skill Installer

通过 npm 或 npm exec，把对公客户经理 `crm` skill 安装到 Codex 与 Claude Code。

## 一条命令安装（推荐）

直接下载固定版本并安装 skill，不保留全局 npm 包：

```bash
npm exec --yes --package=https://github.com/Max052900/crm-skill-installer/releases/download/v1.0.2/crm-skill-installer-1.0.2.tgz -- crm-skill install
```

验证：

```bash
npm exec --yes --package=https://github.com/Max052900/crm-skill-installer/releases/download/v1.0.2/crm-skill-installer-1.0.2.tgz -- crm-skill doctor
```

## 安装全局命令

如果希望长期使用 `crm-skill` 命令：

```bash
npm install -g https://github.com/Max052900/crm-skill-installer/releases/download/v1.0.2/crm-skill-installer-1.0.2.tgz
crm-skill install
crm-skill doctor
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

## 更新

新版本发布后，使用新标签覆盖安装：

```bash
npm install -g https://github.com/Max052900/crm-skill-installer/releases/download/v1.1.0/crm-skill-installer-1.1.0.tgz
crm-skill install
```

## 开发验证

```bash
npm test
npm pack
```

公开仓库只包含规则、脱敏合成样板和安装代码，不包含客户征信、流水、证件、原始案件目录或本机绝对路径。

该仓库设置为 `private: true` 仅用于阻止误发布至公共 npm registry，不影响从 GitHub 安装。

安装器不使用 `postinstall` 自动写入用户目录，避免 npm 临时构建阶段重复执行；skill 落位始终由明确的 `crm-skill install` 命令完成。安装命令使用 GitHub Release 的固定 `.tgz`，避免部分 npm 版本将 `github:` Git 依赖链接到随后被清理的临时目录。
