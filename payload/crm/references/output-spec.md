# Output Spec

本文件定义能力 1/2 的运行时输出结构。目标是未来可以接 PDF 渲染，不需要重想字段。

## 输出总览：底座产物 + 对外四档位

**底座产物**固定为三层，外加默认隐藏的系统层：

1. **首屏结论卡** —— 运行时接入口与结论摘要（格式见 `first-screen-card.md`）
2. **九步扫描正文** —— 首屏卡的展开，按九步扫描结构组织
3. **附录表** —— 明细（6 张表，结构不变）

外加：**系统层** —— 内部记录，默认隐藏。

**对外四档位**共用同一套底座判断，分档、卡点、空间三处结论必须一致（资料澄清清单不出现档位与判断结论，其一致性体现为：需要补的资料 ↔ `pending_verification_materials`，需要说清楚的问题 ↔ `blockers` / `secondary_tracks`）：

| 档位 | 说明 | 规则出处 |
| --- | --- | --- |
| 完整预检稿（默认） | 首屏结论卡 + 九步扫描正文 + 附录 6 表 | 本文件 |
| 客户沟通版 | 面向客户的沟通稿，结论语言继承四档 | `client-comm-output.md` |
| 沟通汇总表 | 一页三分区表，便于用户在客户和银行客户经理之间沟通 | `comm-summary-table.md` |
| 资料澄清清单 | 客户直发版，两张清单（需要补的资料 / 需要说清楚的问题），零行话、不带档位与判断结论 | `client-checklist-output.md` |

三层互不矛盾：首屏卡的结论必须与正文、附录一致。**放弃户同样产出完整底座三层；触发沟通汇总表时同样产出**（汇总表第三区写法见 `comm-summary-table.md`）。

**命名口径**：运行时报告与汇总表默认使用真实主体名称——这是内部工作文档，供用户与客户经理使用；脱敏仅用于样板 / 演示 / 对外传播场景。

---

## 一、首屏结论卡（层 1）

首屏结论卡固定只回答四件事，详细写法见 `first-screen-card.md`：

| # | 报告标题 | 系统字段 |
| --- | --- | --- |
| 1 | 这个户能不能做 | `client_tier` |
| 2 | 瑕疵与调整 | `blocker_and_remedy` |
| 3 | 空间提示 | `capacity_hint` |
| 4 | 下一步 | `next_actions` |

（本表复制自 `narrative-style-guide.md` 第五节，改动须同步。）

语言风格须遵守 `narrative-style-guide.md`：一线词表优先、禁词表零命中、报告层不夹杂英文。

---

## 二、九步扫描正文（层 2）

正文是首屏卡的展开，**包含五个章节**（下列英文为系统字段名；面向客户经理的报告里使用中文章节标题，见 `narrative-style-guide.md` 第五节）：

| 报告标题 | 系统字段 |
| --- | --- |
| 客户情况 | `case_profile` |
| 九步扫描判断 | `scan_chain` |
| 瑕疵与调整 | `blocker_and_remedy` |
| 下一步推进动作 | `next_actions` |
| 材料调整与优化建议 | `advisory_for_material_optimization` |

（本表复制自 `narrative-style-guide.md` 第五节，改动须同步。）

### 篇幅上限（报告体，强制）

正文是报告稿不是故事文案，五章总长压到**一屏内**。每章硬上限（产出后按 `narrative-style-guide.md` 第七节收口，强制不可跳过）：

| 章 | 上限 |
| --- | --- |
| 客户情况 | ≤ 4 句（一句主体 + 一句主营业务 + 一句诉求 + 一句初判依据） |
| 九步扫描判断 | 每步 ≤ 2 句（结论态 + 最少支撑证据） |
| 瑕疵与调整 | ≤ 5 句 |
| 下一步推进动作 | 最多 2 条，每条 ≤ 2 句（动作 + 拿到后判断怎么变） |
| 材料调整与优化建议 | 1-5 条，每条 1 句 |

超过上限即视为没提炼到位，删冗余、不靠加字解释。次级明细一律进附录，不进正文。

### 正文与首屏卡四问的对应关系

| 首屏卡 | 正文 |
| --- | --- |
| 这个户能不能做 | 客户情况写初判依据；分档结论由九步扫描判断逐步支撑 |
| 瑕疵与调整 | 瑕疵与调整（展开） |
| 空间提示 | 九步扫描判断第 6 步（销贷比） |
| 下一步 | 下一步推进动作 |

### 客户情况（`case_profile`）

写清：

- 主体：企业名、成立年限、法人 / 实控人关系
- 主营业务：做什么生意、卖给谁、账期特点
- 申请诉求和资金用途
- 材料可读性状态
- 初判依据：前 3 步快筛的结论（这是个什么户、为什么值得往下看）

不得展开信用卡、查询、账单、担保链和会计明细。

### 九步扫描判断（`scan_chain`）

按 `rm-scan-chain.md` 的九步顺序逐步给判断，**每步一两句一线话**，结论态固定为：**过 | 卡 | 亮点 | 未提供 | 出局**（定义见 `rm-scan-chain.md` 第三节；「出局」仅第 2、3 步硬门可用）。

- 每步先给结论态，再给最少支撑证据；"过"的步一句带过，不铺开。
- "卡"的步必须同时给调整方向或提示，细节留给"瑕疵与调整"章展开，本章不重复。
- "未提供"的步写清缺什么、列不列待核查资料（规则见 `rm-scan-chain.md` 第三节）。
- **硬门出局后照常扫完**：第 2、3 步触发「出局」的户，其余步骤仍按已有材料扫描——有材料的步照常给结论态，没材料的记「未提供」。理由：调整方向（如换实控人）一旦成立，判断可复活，材料分析不浪费；这也符合"初判不悬置"的立场。
- 逐笔明细、不改结论态的小瑕疵进附录（降噪规则挂载见 `rm-scan-chain.md` 第九节）。

### 瑕疵与调整（`blocker_and_remedy`）

首屏第 2 问的展开。写清：

- 每处瑕疵一句话定性：是什么、卡在哪一步、有多重（影响分档还是只作提示），以及怎么调整 / 怎么优化基本面
- **每处硬门瑕疵必须带调整方向判断**（补材料 / 调表述 / 换实控人 / 换主体）；调整方向确认走不通才落"放弃"，且必须写清掂量过哪些调整方向、为什么走不通（见 `rm-scan-chain.md` 第六节）
- 豁免生效的卡点点明豁免依据（见 `rm-scan-chain.md` 第七节），并落 `waiver_basis` 字段（合同见第六节）

### 下一步推进动作（`next_actions`）

首屏第 4 问的展开。追问约束继承既有规则（出处见 `priority-rules.md` First-Round Question Rule，挂载见 `rm-scan-chain.md` 第九节）：

- **最多两条**，第一条直指最大卡点，第二条补承载或证据侧（排序规则见 `first-screen-card.md` 第 4 问）。
- 每条写清：找客户要什么、问什么，需要什么证据，拿到后判断怎么变。
- 语气是帮客户过关，不是盘问（见 `narrative-style-guide.md` 第四节）。

> 说明：本章由旧"首轮追问"（`first_round_questions`）更名而来，追问数量、指向、证据要求等约束语义不变。**更名只作用于输出层报告表述**；`clarify-rules.md`、`input-spec.md`、`node-contracts.md` 等本次未改的规则文档内部保留旧术语，视为系统层，不做全局替换。

### 材料调整与优化建议（`advisory_for_material_optimization`）

**这一章是客户辅导建议——告诉客户经理「客户应该补什么 / 调整什么 / 哪里需要优化」**，帮客户经理推进客户。

体现 `SKILL.md`「工作性质与定位」节的核心立场：**workflow 是客户经理筛选 + 客户辅导工具，不是审批工具**。这一章把财报、流水、征信汇总后的"可调整 / 优化点"主动指出来，客户经理可以拿这些直接和客户对接。

写作要求：

- 1-5 条简明建议（至少 1 条），每条一句话，方向感清晰。优质户材料齐可少给；放弃户本章可仅给与调整方向相关的准备建议（如换实控人后重启需要什么）。
- 用辅导式语气（「客户可以补充 X」「建议调整 Y 表述」「财报中 Z 项可考虑优化」），不用审批式（「证据不足」「无法核实」）。
- 不输出银行 / 产品 / 修单 / 养单方案，不承诺额度 / 期限。
- 不做尽调级细颗粒挑战（如"逐笔核对每笔流水来源"）。

#### 与下一步推进动作的边界

本章和下一步推进动作可能围绕**同一关键材料**（例如都涉及"水母完整报告"或"企业征信原件"），但**视角必须不同**：

| | 下一步推进动作（第 4 章） | 材料调整与优化建议（第 5 章） |
| --- | --- | --- |
| 视角 | "立刻找客户要什么、问什么" | "客户如何准备 / 调整 / 优化" |
| 目的 | 解开最大卡点、决定下一步怎么推 | 帮客户经理推进、引导客户准备材料 |
| 形式 | 推进动作 | 建议句 |
| 数量 | 最多 2 条，紧扣最大卡点 | 1-5 条，可以更宽 |
| 范围 | 仅本案立刻需要的关键证据 | 包含为后续推进 / 多家银行对接 / 长期合规化 准备的调整 |

**红线**：第 5 章不得**机械重复**下一步推进动作的内容。如果两章都提到同一材料（如"水母完整报告"），推进动作写"先把水母完整报告要到手，开票回款就能定"，第 5 章必须从"如何准备 / 调整 / 优化"角度展开，并**至少包含一条更宽的、推进动作不涉及的辅导建议**（如「建议客户考虑后续合规化路径」「建议客户提前梳理近 2 年查询的业务背景」等）。

判断标准：把第 4 章和第 5 章并排读，第 5 章应该让客户经理看到推进动作没说到的**额外推进价值**，而不是同样的话换说法重写一遍。

---

## 三、附录表（层 3）

固定附录表：

1. `subject_and_business_table`
2. `personal_credit_summary_table`
3. `corporate_credit_summary_table`
4. `financial_statement_summary_table`
5. `shuimu_summary_table`
6. `metric_and_gap_table`

### 默认进入附录的项

以下默认进入附录：

- 信用卡详情
- 查询详情
- 账单明细
- 担保和担保链详情
- 次要会计明细
- 不影响判断的合同、发票、执照附件
- 个人流水的逐笔混杂明细（提现、还款、消费、大额借入拆出等）
- 按揭及相关还款责任的逐笔明细

个人流水混杂明细、信用卡、查询、按揭 / 担保责任默认不抢正文主线；只有当它们与弱主体、重负债等叠加、改变某步结论态或分档时（见 `priority-rules.md` Anti-Over-Suppression Rule，挂载见 `rm-scan-chain.md` 第九节），才在正文写其对判断的影响，仍不展开逐笔明细。

只有当它们改变分档或某步结论态时，才能在正文 / 首屏卡被提及；正文仍只写对判断的影响，不展开明细。

---

## 四、四档 → 旧枚举映射（系统层）

四档定稿话术与旧枚举映射以 `narrative-style-guide.md` 第五节为唯一出处（含"待核查资料含前 3 步快筛关键材料 → 无论档位记 `need_key_info`"的覆盖规则），本文件不复述映射表。

**此映射供回归语义等价判定用**：改版前后同一样本的判断，档位映射回旧枚举后必须一致。旧枚举与旧中文决策词不再出现在报告文字里。

---

## 五、PDF 导向合同

```json
{
  "first_screen_card": {
    "client_tier": {},
    "blocker_and_remedy": {},
    "capacity_hint": {},
    "next_actions": []
  },
  "body": {
    "case_profile": {},
    "scan_chain": [],
    "blocker_and_remedy": {},
    "next_actions": [],
    "advisory_for_material_optimization": []
  },
  "appendix": {
    "subject_and_business_table": [],
    "personal_credit_summary_table": [],
    "corporate_credit_summary_table": [],
    "financial_statement_summary_table": [],
    "shuimu_summary_table": [],
    "metric_and_gap_table": []
  },
  "comm_summary_table": {
    "header": {},
    "client_profile": {},
    "asks_from_client": [],
    "info_summary_for_bank_rm": {}
  },
  "client_checklist": {
    "missing_materials": [],
    "clarifications": []
  },
  "system": {
    "material_index": [],
    "slot_records": [],
    "issues": [],
    "secondary_tracks": [],
    "suppressed_noise": [],
    "current_precheck_decision": {},
    "stage_gate_result": {}
  }
}
```

说明：

- `comm_summary_table` 仅在触发沟通汇总表档位时产出（触发词与格式见 `comm-summary-table.md`）。
- `client_checklist` 仅在触发资料澄清清单档位时产出（触发词与格式见 `client-checklist-output.md`，合同见第十节）。
- `current_precheck_decision` 移入系统层：旧枚举只作系统层映射与回归对照，不进报告文字。
- 系统层其余字段不变。

## 六、首屏结论卡字段合同

### `client_tier`

```json
{
  "tier": "优质户 | 正常户 | 有机会 | 放弃",
  "reason": "一句话理由：硬门过没过、卡点几个、豁免有没有生效",
  "pending_verification_materials": [
    {
      "material": "缺什么材料",
      "impact": "核到什么可能改档",
      "is_fast_screen_key": "布尔值 true / false：是否属前 3 步快筛关键材料（如征信），影响系统层映射"
    }
  ]
}
```

### `blocker_and_remedy`

```json
{
  "blockers": [
    {
      "blocker": "卡点一句话",
      "scan_step": "卡在九步中的哪一步",
      "is_hard_gate": "布尔值 true / false：是否硬卡点（第 2、3 步硬门触发）",
      "remedy_direction": "换实控人 | 换主体 | 补材料 | 调表述 | 无救法",
      "remedy_note": "调整方向判断说明；remedy_direction 为无救法时写清掂量过哪些调整方向、为什么走不通",
      "waiver_basis": "可选：标签豁免 | preferred 行业豁免——仅当豁免生效时填（豁免规则见 rm-scan-chain.md 第七节）"
    }
  ],
  "watch_item": "可选：无卡点时填——最值得盯的一件事或亮点（对应首屏第 2 问'没硬卡点'写法，见 first-screen-card.md）"
}
```

硬性约束：`is_hard_gate` 为真的卡点，`remedy_direction` 与 `remedy_note` 必填；未完成调整方向判断不得使 `client_tier.tier` 落"放弃"。`blockers` 为空时填 `watch_item`。

用词映射：系统字段 `remedy_direction`（含枚举值"无救法"）为系统层旧称，字段名与枚举值不改；报告层对应用词为"调整方向 / 怎么调 / 优化动作"，判断走不通写"调不回来 / 调整方向确认走不通"。

### `capacity_hint`

```json
{
  "annual_sales": "年销售规模（含口径来源）；若采用流水口径，应等于 revenue_breakdown.total_identifiable_revenue；computable 为 false 时可为 null",
  "revenue_breakdown": {
    "period": "统计期间",
    "corporate_account_revenue": "对公账户可识别营收；无则填 0，缺材料则填 null",
    "private_bank_revenue": "个人银行卡可识别营收；无则填 0，缺材料则填 null",
    "wechat_revenue": "微信可识别营收；无则填 0，缺材料则填 null",
    "private_account_revenue": "私人账户营收合计 = 个人银行卡 + 微信",
    "total_identifiable_revenue": "合计可识别营收 = 对公账户 + 私人账户",
    "excluded_non_revenue_inflow": "已剔除的非营收入账",
    "pending_unverified_inflow": "待核实、暂未计营收的入账",
    "deduplication_note": "微信提现、账户互转等去重说明"
  },
  "existing_debt": "现有负债；computable 为 false 时可为 null",
  "request_amount": "本次诉求",
  "headroom_note": "按 ≤50% 通用口径的空间判断",
  "waiver_note": "可选：优质户销贷比放宽说明及豁免依据（好行业同）",
  "computable": "布尔值 true / false：年销售或现有负债口径缺时为 false，缺口列入待核查资料"
}
```

`revenue_breakdown` 在报告引用任何流水营收数字时必填。金额关系必须满足：`private_account_revenue = private_bank_revenue + wechat_revenue`，`total_identifiable_revenue = corporate_account_revenue + private_account_revenue`。缺少某渠道材料时填 `null` 并列入待核查资料，不得把“缺材料”写成 0；确认该渠道无营收时才填 0。

只做空间粗估，禁止承诺式额度 / 期限。

### `next_actions`

```json
[
  {
    "action": "推进动作：找客户要什么、问什么（最多两条之一）",
    "target": "压在哪个卡点 / 缺口上（第一条必须压最大卡点）",
    "required_evidence": [],
    "expected_change": "拿到 / 问到后判断怎么变（改档 / 定卡点 / 定空间）"
  }
]
```

## 七、正文字段合同

### `case_profile`

```json
{
  "subject_summary": "主体摘要（真实名称，命名口径见输出总览）：企业名、成立年限、法人 / 实控人关系",
  "business_summary": "主营业务：做什么生意、卖给谁、账期特点",
  "request_summary": "申请诉求摘要",
  "material_readability": "readable | degraded_readable | blocked",
  "initial_tier_basis": "初判依据：前 3 步快筛的结论"
}
```

### `scan_chain`

```json
[
  {
    "step": "基本面 | 行业 | 征信 | 水母 | 个人 / 微信流水 | 销贷比 | 财报 | 资产 | 存货",
    "verdict": "过 | 卡 | 亮点 | 未提供 | 出局",
    "note": "一两句一线话：结论 + 最少支撑证据"
  }
]
```

固定九个条目、按九步顺序排列；`出局` 仅第 2、3 步（行业、征信）可用。

### `blocker_and_remedy`（正文展开）

结构同首屏卡合同（见第六节），正文里可在 `remedy_note` 展开，仍受 ≤5 句篇幅上限约束。

### `next_actions`（正文展开）

结构同首屏卡合同（见第六节），正文里每条可展开到 2 句。

### `advisory_for_material_optimization`

```json
[
  {
    "category": "材料补充 | 表述调整 | 财报优化 | 流水准备 | 主体澄清",
    "suggestion": "辅导式建议，1-5 条（至少 1 条）",
    "why": "为什么这条建议有助于推进客户"
  }
]
```

## 八、系统层决策字段合同

### `current_precheck_decision`（系统层）

```json
{
  "decision": "continue_precheck | need_key_info | not_recommended_for_precheck",
  "client_tier": "优质户 | 正常户 | 有机会 | 放弃",
  "pending_verification_materials": [],
  "confidence": "high | medium | low",
  "forbidden_next_steps": ["bank_matching", "product_recommendation", "committed_quota_or_tenor", "repair_plan"]
}
```

- `decision` 保留旧三枚举，仅作系统层映射与历史对照；映射规则见第四节（唯一出处 `narrative-style-guide.md` 第五节）。
- `client_tier` 与 `pending_verification_materials` 必须与首屏卡 `client_tier` 字段一致。
- `forbidden_next_steps` 边界更新：`committed_quota_or_tenor` 替代旧 `quota_suggestion` / `tenor_suggestion`——禁的是**承诺式额度 / 期限**（"XX 行能批 XX 万"式）；销贷比口径的空间粗估（`capacity_hint`）是允许的。`bank_matching`、`product_recommendation`、`repair_plan` 照旧禁止。

## 九、沟通汇总表字段合同

格式、触发词与写法规则见 `comm-summary-table.md`；本节只定系统字段。

### `comm_summary_table`

```json
{
  "header": {
    "company_name": "企业名",
    "date": "日期"
  },
  "client_profile": {
    "subject": "企业名、成立年限、实控人",
    "main_business": "做什么生意、卖给谁、账期特点",
    "tier": "四档之一 + 待核查资料（如有）",
    "highlights": "征信 / 资产 / 行业 / 标签等亮点",
    "blocker": "卡点一句话 + 调整方向",
    "capacity": "销贷比口径空间提示"
  },
  "asks_from_client": [
    {
      "material_or_action": "材料 / 动作",
      "why": "为什么要",
      "urgency": "立刻 | 本周 | 报单前"
    }
  ],
  "info_summary_for_bank_rm": {
    "no_referral_note": "仅放弃户填：置于本区顶部的一行『暂不推报 + 原因（调整方向确认走不通）』；其余档位为 null",
    "fundamentals": "主营业务、客群画像、经营年限；有存货库存信息则加上",
    "revenue": {
      "corporate": "对公营收",
      "private_bank": "私帐——个人银行卡营收",
      "wechat": "私帐——微信营收",
      "interest_settlement": "结息（各账户合计，注明期间；少于 100 元写『没什么结息』）"
    },
    "debt": {
      "legal_person": "法人负债",
      "spouse": "配偶负债",
      "corporate": "企业负债（三项按人分列，不合并）"
    }
  }
}
```

`info_summary_for_bank_rm` 定性：本区是**客户信息汇总**，不是推荐理由——给事实、让银行客户经理自己判断（与"瑕疵不主动列"同源：不隐瞒、不做倾向性包装）。数字难看也照报；缺材料的字段如实写"未提供"。放弃户第三区照出信息汇总（事实不因档位变），仅多填 `no_referral_note` 一行。写法规则见 `comm-summary-table.md` 第四节。

一致性约束：对外档位间，分档档位词、卡点定性、空间结论的语义与数字不得改写；表格槽位允许压缩表述。多卡点时，`client_profile.blocker` 只写最先影响推进的一个（含调整方向），其余卡点通过 `asks_from_client` 区体现（规则见 `comm-summary-table.md`）。

## 十、资料澄清清单字段合同

格式、触发词、五条规则与写法见 `client-checklist-output.md`；本节只定系统字段。

### `client_checklist`

```json
{
  "missing_materials": [
    {
      "material": "要什么材料（客户话，零行话）",
      "note": "怎么准备 / 范围提示（如\"找代账会计出\"\"哪张卡有经营收款就拉哪张\"）"
    }
  ],
  "clarifications": [
    {
      "question": "需要说清楚的问题（客户话，具体到事实）",
      "background": "为什么问（必填，如\"银行会问到\"\"车登记在商行名下\"）"
    }
  ]
}
```

一致性约束（同一底座判断不得多头口径）：

- `missing_materials` 必须与首屏卡 `client_tier.pending_verification_materials` 一致（合并下一步推进动作、材料调整与优化建议中要客户补的材料，去重后转译成客户话）；不得新增底座没有的要求，不得漏掉底座列明的关键待核查资料。
- `clarifications` 每条必须能在 `blocker_and_remedy.blockers` 或系统层 `secondary_tracks` 中找到对应项，语义一致，仅转译成客户话；`background` 必填。
- 全字段不出现档位词、判断结论与内部行话（水母 / 销贷比 / 征信硬门 / 待核查资料等），检查点见 `client-checklist-output.md` 第五节。
