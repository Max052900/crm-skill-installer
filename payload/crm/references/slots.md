# Slot Inventory

本文件定义能力 1/2 的最小槽位。不要加入银行、产品、额度、期限、修复或养单槽位。

## Slot Record

每个槽位至少包含：

```json
{
  "name": "subject.name",
  "value": "string | number | boolean | null",
  "unit": "optional",
  "status": "present | missing | inferred | conflicted | not_applicable | not_enough_to_calculate",
  "source_refs": ["material_id:field_or_page"],
  "confidence": "high | medium | low",
  "notes": "optional"
}
```

## Subject And Route Base

| Slot | Meaning | Body Eligibility |
| --- | --- | --- |
| `subject.name_or_alias` | 客户或主体代称，脱敏后使用 | Profile only |
| `subject.role` | 法人、股东、实控人、经营者、配偶等 | Profile |
| `subject.shareholding_or_control` | 股权或实际控制关系 | Body if alignment changes path |
| `subject.city` | 城市或经营所在地 | Profile |
| `subject.age_or_birth_year` | 年龄或出生年 | Appendix unless path-changing |
| `business.company_name_or_alias` | 企业代称 | Profile |
| `business.license_age_months` | 执照年限 | Body if short or conflicted |
| `business.industry` | 行业原始值 | Profile |
| `business.industry_route` | `preferred | workable | cautious | restricted | unknown` | Body if cautious/restricted |
| `business.tech_tag_route` | `none | coarse_positive | coarse_cautious | unknown` | Body only as coarse route |
| `business.actual_operation_summary` | 真实经营摘要 | Body |
| `business.visibility_level` | `high | medium | low | unknown` | Body if weak |
| `request.amount` | 申请金额 | Profile |
| `request.use_of_funds` | 资金用途 | Body if inconsistent |
| `request.urgency` | 用款紧急程度 | Appendix unless path-changing |

## Personal Credit

| Slot | Meaning | Body Eligibility |
| --- | --- | --- |
| `personal_credit.report_date` | 征信日期 | Appendix |
| `personal_credit.current_loan_balance` | 当前贷款余额 | Body if heavy |
| `personal_credit.monthly_payment` | 月供或等效还款压力 | Body if capacity contradiction |
| `personal_credit.credit_card_used` | 信用卡已用额度 | Appendix by default |
| `personal_credit.credit_card_utilization` | 信用卡使用率 | Appendix by default |
| `personal_credit.overdue_summary` | 逾期摘要 | Body if redline or explanation required |
| `personal_credit.query_count_recent` | 近 1/3/6 个月查询 | Appendix by default |
| `personal_credit.guarantee_summary` | 对外担保或共借 | Appendix by default, body if heavy |
| `personal_credit.redline_flags` | 红线标记 | Body |
| `personal_credit.explainable_blemish` | 可解释瑕疵 | Body only if affects path |

## Corporate Credit

| Slot | Meaning | Body Eligibility |
| --- | --- | --- |
| `corporate_credit.report_date` | 企业征信日期 | Appendix |
| `corporate_credit.loan_balance` | 企业贷款余额 | Body if heavy/conflicting |
| `corporate_credit.credit_line_used` | 授信占用 | Body if capacity contradiction |
| `corporate_credit.guarantee_summary` | 企业担保 | Appendix by default |
| `corporate_credit.risk_flags` | 司法、风险、异常 | Body if redline or path-changing |
| `corporate_credit.debt_structure_note` | 债务结构摘要 | Body if primary contradiction |

## Financial Statements

| Slot | Meaning | Body Eligibility |
| --- | --- | --- |
| `financial.period` | 报表期间 | Appendix |
| `financial.total_assets` | 总资产 | Appendix unless capacity contradiction |
| `financial.total_liabilities` | 总负债 | Body if capacity contradiction |
| `financial.owner_equity` | 所有者权益 | Body if weak or negative |
| `financial.revenue` | 收入 | Body if scale conflict |
| `financial.net_profit` | 净利润 | Body if capacity contradiction |
| `financial.accounts_receivable` | 应收账款 | Appendix unless abnormal |
| `financial.inventory` | 存货 | Appendix unless abnormal |
| `financial.cash_balance` | 货币资金 | Appendix unless liquidity contradiction |
| `financial.statement_reliability` | `high | medium | low | unknown` | Body if low |

## Shuimu

| Slot | Meaning | Body Eligibility |
| --- | --- | --- |
| `shuimu.period` | 报告期间 | Appendix |
| `shuimu.invoice_trend` | 开票趋势 | Body if trend changes path |
| `shuimu.tax_trend` | 纳税趋势 | Body if trend changes path |
| `shuimu.customer_supplier_concentration` | 上下游集中度 | Appendix unless abnormal |
| `shuimu.operation_image` | 经营画像 | Body if weak or inconsistent |
| `shuimu.abnormal_flags` | 异常项 | Body if path-changing |

## Flow Support

| Slot | Meaning | Body Eligibility |
| --- | --- | --- |
| `flow.period` | 流水期间 | Appendix |
| `flow.monthly_inflow_average` | 月均流入 | Body if scale/capacity contradiction |
| `flow.corporate_account_revenue` | 对公账户可识别经营营收 | Body whenever revenue is cited |
| `flow.private_bank_revenue` | 个人银行卡可识别经营营收 | Body whenever revenue is cited |
| `flow.wechat_revenue` | 微信可识别经营营收 | Body whenever revenue is cited |
| `flow.private_account_revenue` | 私人账户营收合计（个人银行卡 + 微信） | Body whenever revenue is cited |
| `flow.total_identifiable_revenue` | 合计可识别营收（对公 + 私人账户） | Body whenever revenue is cited |
| `flow.excluded_non_revenue_inflow` | 已剔除的借款、退款、内部划转等非营收入账 | Appendix; Body if material |
| `flow.pending_unverified_inflow` | 待核实、暂未计营收的入账 | Body if scale/capacity contradiction |
| `flow.deduplication_note` | 微信提现、账户互转、平台与银行重复记录的去重说明 | Appendix; Body if material |
| `flow.business_income_visibility` | 经营收入可见度 | Body if weak |
| `flow.counterparty_quality` | 对手方质量 | Appendix unless abnormal |
| `flow.abnormal_transactions` | 异常流入流出 | Body if path-changing |

## Metrics And Contradiction Slots

| Slot | Meaning |
| --- | --- |
| `metric.material_readability` | `readable | degraded_readable | blocked` |
| `metric.subject_alignment_score` | 主体和企业关系可读性 |
| `metric.business_visibility_score` | 经营可见度 |
| `metric.debt_pressure_level` | `low | medium | high | unknown` |
| `metric.scale_consistency_level` | `consistent | weak_conflict | strong_conflict | unknown` |
| `metric.capacity_readability` | 承载能力可读性 |
| `primary_contradiction.type` | 唯一核心矛盾枚举 |
| `primary_contradiction.reason` | 为什么它最早改变路径 |
| `primary_contradiction.evidence_refs` | 证据来源 |
| `secondary_tracks` | 被压低但仍需记录的候选矛盾 |
| `suppressed_noise` | 不进入正文的细节 |
| `first_round_questions` | 最多两个追问 |

## Contradiction Enum

能力 1/2 只允许这些核心矛盾类型：

- `redline`
- `business_preference`
- `clearance_risk`
- `tech_tag_coarse_route`
- `operation_reality_visibility`
- `suspected_shell`
- `subject_alignment`
- `capacity`
- `material_gap`
- `no_primary_contradiction`

`no_primary_contradiction` 只用于强样本或材料暂未显示明显矛盾；仍需输出附录和验证结论。

## Initial Paper Coverage Check

Checked against `merchant-loan-restaurant-license-8m` in `sample-index.md`.

Covered slots:

- `business.industry`
- `business.license_age_months`
- `business.actual_operation_summary`
- `request.amount`
- `request.use_of_funds`
- `metric.material_readability`
- `primary_contradiction.type`

Expected downgraded slots because the case summary does not include formal reports:

- `personal_credit.*` -> `not_enough_to_calculate`
- `corporate_credit.*` -> `not_enough_to_calculate`
- `financial.*` -> `not_enough_to_calculate`
- `shuimu.*` -> `not_enough_to_calculate`
- `flow.*` -> `not_enough_to_calculate`

No mandatory capability 1/2 slot addition was identified from this first paper check.
