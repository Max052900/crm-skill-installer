# 对公客户经理 Workflow 总纲

本文件是整套 workflow 的顶层总纲。执行细节见 `SKILL.md`，本文件只回答：这个 workflow 是什么、输入输出是什么、运行时主线是什么、当前边界、当前做到哪一层、后续往哪里演化。

## 一、这个 workflow 是什么

目标始终是：**蒸馏一个对公客户经理能力出来**。

- 当前最合适的产品形态是 **workflow**，不是 H5、不是预审系统、不是预审员实现计划。
- 当前最合适的运行时接入口是 **首屏结论卡**。
- 这套 workflow 把混乱的企业贷 / 商户贷客户材料，翻译成一线客户经理视角的初次判断——人格总纲见 `SKILL.md` 一线人格声明。

## 二、输入

输入不是标准表单，而是**一个混合案件包文件夹**，里面允许混放：

- 文字说明 / 信息采集表 / 聊天记录摘要
- 个人征信、企业征信
- 财报、水母报告
- 流水 / 回单
- 营业执照 / 资质图 / 合同 / 发票等附件

workflow 的关键不是收文件，而是把不同格式资料翻译成同一套客户经理判断输入（见 `references/input-spec.md`、`references/conflict-handling.md`）。

## 三、输出（底座三层 + 对外四档位）

另有一条不进入预检判断的独立支线：用户明确要求“只需汇总”、征信台账或桌面资料包时，路由到 `assembling-crm-case-pack`，只产出事实汇总 XLSX、资料归档目录和验证记录；不生成首屏结论卡、分档或产品建议。

**底座产物**固定三层（外加系统层内部记录，默认隐藏）：

1. **首屏结论卡** —— 运行时接入口与结论摘要
2. **九步扫描正文** —— 首屏卡的展开（五章）
3. **附录表** —— 明细（6 张表）

**对外四档位**共用同一套底座判断，分档、卡点、空间三处结论必须一致（资料澄清清单不出现档位与判断结论，其一致性检查点=资料与待核查资料一致、问题与瑕疵 / 观察项对应、零行话、无档位泄漏）：

1. **完整预检稿**（默认）
2. **客户沟通版**（客户沟通要点）
3. **沟通汇总表**（一页三分区，便于用户在客户和银行客户经理之间沟通）
4. **资料澄清清单**（客户直发版，两张清单：需要补的资料 / 需要说清楚的问题）

格式见 `references/output-spec.md`、`references/first-screen-card.md`、`references/comm-summary-table.md`、`references/client-comm-output.md`、`references/client-checklist-output.md`。

## 四、运行时判断主线

判断主线是**九步扫描链**（见 `references/rm-scan-chain.md`）：基本面 → 行业 → 征信 → 水母 → 个人 / 微信流水 → 销贷比 → 财报 → 资产 → 存货——前 3 步快筛出初判分档，后 6 步算"能做多大、怎么做成"。

首屏结论卡固定只回答四件事：

1. **这个户能不能做** —— 四档 + 一句话理由；缺料附待核查资料
2. **瑕疵与调整** —— 瑕疵一句话定性 + 怎么调整 / 怎么优化基本面；硬门瑕疵必须带调整方向判断
3. **空间提示** —— 销贷比口径的额度空间粗估
4. **下一步** —— 推进动作最多两条，具体到找客户要什么、问什么

四个核心动作（后续所有工作只围绕这四块）：

1. 看这个户能不能做
2. 看瑕疵在哪、怎么调
3. 材料不够先给初判，缺的列待核查资料
4. 一条路不通先想怎么调，别把全案判死

## 五、当前边界

- 当前可执行层只覆盖**能力 1 和能力 2** + 首屏结论卡接入口。
- 不做银行匹配、产品推荐、修单 / 养单的具体操作方案、H5。
- 不做承诺式额度 / 期限（"XX 行能批 XX 万"式）；销贷比口径的空间粗估**允许**（见 `references/rm-scan-chain.md` 第八节）。
- 一线调整追问（换实控人 / 换主体）**允许**，限"问方向，不出操作方案"。
- 行业只做粗路由：`preferred` / `workable` / `cautious` / `restricted`。
- **A / B / C / D 只是离线压测场景，不是运行时客户分类**。
- 文字说明与资料冲突时，先保留文字说明作为经营口径锚点，再追差额来源，不机械按最低数字覆盖（见 `references/conflict-handling.md`）。

## 六、当前做到哪一层

一线客户经理判断骨架已形成：九步扫描链主线、四档分档 + 待核查资料、首屏结论卡四问、四种输出档位。

- **样本 B** 提供"主体一般时先看经营证据、第 1 问分档理由句"的样板。
- **样本 A** 提供"分档 + 待核查资料、瑕疵与调整、下一步推进动作"写法的样板。

样板见 `references/examples/`（四份样板已按新结构重写：首屏结论卡四问 + 九步扫描正文 + 沟通汇总表，可直接作为输出格式与口吻样板）。

## 七、资产分层

整套 workflow 资产分 7 层：

| 层 | 文件 |
| --- | --- |
| 总入口层 | `WORKFLOW.md`（本文件） |
| 执行入口层 | `SKILL.md` |
| 输入理解层 | `references/input-spec.md`、`references/conflict-handling.md` |
| 判断规则层 | `references/rm-scan-chain.md`（主线）；`references/path-type-rules.md`、`references/priority-rules.md`、`references/path-status-rules.md`（系统层） |
| 输出组织层 | `references/output-spec.md`、`references/first-screen-card.md`、`references/narrative-style-guide.md`、`references/comm-summary-table.md`、`references/client-comm-output.md`、`references/client-checklist-output.md` |
| 样板层 | `references/examples/sample-a-runtime-output.md`、`references/examples/sample-b-runtime-output.md`、`references/examples/sample-c-runtime-output.md`、`references/examples/sample-c-sparse-material-visibility.md` |
| 压测与回归层 | `references/evaluation-scenes.md`、`references/evaluation-scorecard.md`、`references/regression-log.md` |

## 八、后续演化

- 能力 3 / 4 模式层（总纲骨架见 `references/mode-layer-node-protocol.md`）
- clarify / reroute 专门规则细化（触发条件需先与用户确认专业口径）
- 后续场景样板 sample-d
- 沟通汇总表的排版升级（当前为纯 markdown 表，够用即可）

后续演化不在本轮范围内，本轮先把一线人格改造与对外档位输出钉住。
