# Stage Gates

本文件把周计划改成样本驱动的阶段门。每个阶段都允许 `pass`、`degraded_pass` 或 `fail`，但失败时不得进入下一阶段。

## Gate A: Material Readability

证明系统能把材料读入并分类。

Hard gates:

- 至少识别进件口径或主体信息
- 所有材料都有 `material_id`
- 未知材料不得丢弃

Degradable items:

- 图片或扫描件只能部分读取
- 材料日期不完整

Blockers:

- 申请主体不可确认
- 只有无法读取的附件

Not allowed before passing:

- 不得给出九步扫描判断或分档结论
- 不得产出首屏结论卡

## Gate B: Consistency Readability

证明系统能保留冲突并作出处理。

Hard gates:

- 同字段多来源数字冲突必须生成 issue
- 证据优先级必须记录
- 冲突不得静默覆盖来源

Degradable items:

- 冲突可先人工描述，不强制机器评分

Blockers:

- 主体冲突无法定位来源
- 高优先级证据缺失却输出确定判断

Not allowed before passing:

- 不得给出确定性分档结论

## Gate C: Priority Readability（系统层）

证明系统层能选出唯一 `primary_contradiction`。此为系统层内部记录（见 `priority-rules.md` 顶部定位说明），不进报告文字——报告主线是九步扫描与四档分档。

Hard gates:

- 系统层 `primary_contradiction` 只能有一个
- 优先级必须按 redline -> business/clearance -> tech coarse -> operation -> subject -> capacity
- 被压低候选必须进入 `secondary_tracks`

Degradable items:

- 分数可用人工规则，不强制数值化

Blockers:

- 系统层同时记录多个主矛盾
- 将银行或产品推荐混入优先级

Not allowed before passing:

- 不得进入输出正文生成

## Gate D: Next-Action Usability

证明"下一步"推进动作能帮客户经理推进（旧称首轮追问；第一条压最大卡点、第二条允许压承载/证据侧，排序规则见 `first-screen-card.md` 第 4 问）。

Hard gates:

- 推进动作最多 2 条
- 第一条直指最大卡点，第二条补承载或证据侧（排序规则见 `first-screen-card.md` 第 4 问）
- 每条写清找客户要什么、问什么、拿到后判断怎么变
- 不得输出泛化补件清单

Degradable items:

- 证据要求可以是类别，不必须指定文件名

Blockers:

- 动作解不开最大卡点
- 第一轮给了 3 条以上推进动作

Not allowed before passing:

- 不得标记样本为可交付

## Gate E: Output Usability

证明首屏结论卡、正文和附录分层可用。

Hard gates:

- 首屏结论卡四问齐全：这个户能不能做（四档 + 一句话理由，缺料附待核查资料）/ 瑕疵与调整 / 空间提示 / 下一步（格式见 `first-screen-card.md`）
- 正文五章齐全：客户情况 / 九步扫描判断（九步都有结论态：过 | 卡 | 亮点 | 未提供 | 出局，「出局」仅第 2、3 步硬门可用）/ 瑕疵与调整 / 下一步推进动作（最多两条）/ 材料调整与优化建议（1-5 条）
- 结论只用四档 + 待核查资料的定稿话术（见 `narrative-style-guide.md` 第五节），且系统层映射字段（旧三枚举 `current_precheck_decision.decision`）在系统层记录中保留
- 每处硬门瑕疵带调整方向判断（补材料 / 调表述 / 换实控人 / 换主体）；确认无可行调整方向才得落"放弃"档
- 初判不悬置：关键材料缺失仍给分档 + 待核查资料
- 输出层零禁词（禁词表见 `narrative-style-guide.md` 第二节）
- 附录有固定六张表；信用卡、查询、账单、担保链和次要会计明细默认进入附录（降噪：不改结论态的小瑕疵不进正文）
- 短周期（不足 3 个月）流水不年化推全年规模
- 多来源数字冲突不被静默抹平（处理流程见 `conflict-handling.md`）
- 第 5 章「材料调整与优化建议」语气符合辅导式（详见 `narrative-style-guide.md` 第六节）：1-5 条简明建议、不夹审批 / 尽调级表述、与下一步推进动作不机械重复
- 对外档位结论一致（若产出客户沟通版 / 沟通汇总表）：分档、卡点、空间三处结论必须一致；若产出资料澄清清单，检查点=资料与待核查资料一致、问题与瑕疵 / 观察项对应、零行话、无档位泄漏（见 `client-checklist-output.md`）

Degradable items:

- 附录表可先为空，但必须存在

Blockers:

- 输出银行、产品、承诺式额度 / 期限、修复或养单建议（销贷比口径的空间粗估是允许的）
- 长篇平铺 narrative 替代首屏卡加正文加附录结构
- 报告文字命中禁词表
- 悬置初判（"材料不够暂不判断"）
- 硬门瑕疵未做调整方向判断就落"放弃"档
- 第 5 章退化为审批式拒绝语气或与下一步推进动作机械重复

Not allowed before passing:

- 不得交付给下一阶段 PDF 或 UI

## Gate F: Sample Hardening

证明真实样本能覆盖关键类型。

Hard gates:

- 至少索引强样本、谨慎行业样本、主体错配样本、稀疏材料样本
- 每个样本记录可用性和隐私处理状态
- 缺样本时标明缺口，不用假样本冒充

Degradable items:

- 样本可先是脱敏摘要或本地指针

Blockers:

- 主要验证依赖虚构样本
- 为适配 schema 改写业务事实

Not allowed before passing:

- 不得声称能力 1/2 已充分验证

## First Implementation Pass Order

1. intake + classification
2. extraction chain
3. slot merge
4. consistency layer
5. priority engine
6. next-action generation
7. first-screen card + body + appendix output
8. sample-based gate validation

## Deferrals

阶段门不得要求这些功能通过：

- 银行匹配
- 产品推荐
- 承诺式额度 / 期限（销贷比口径的空间粗估不在此列，属正常输出）
- 修复或养单输出
- 深行业库
- 科技标签深分支
- PDF 样式
