# Security and privacy

不要提交真实客户的征信、流水、身份证件、联系方式、账户信息、未脱敏聊天记录或本机案件路径。

公开样板必须使用虚构主体和合成数字。发布前至少检查：

```bash
rg -n '/Users/|/home/|Desktop|Documents' payload
rg -n 'gh[pousr]_|github_pat_|sk-|AKIA|PRIVATE KEY' .
rg -n '(?<![0-9])1[3-9][0-9]{9}(?![0-9])|(?<![0-9])[1-8][0-9]{16}[0-9Xx](?![0-9])' payload -P
```

如发现安全问题，请通过 GitHub Security Advisory 私下报告，不要在公开 Issue 中粘贴客户材料或凭据。
