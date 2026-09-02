# Node Contracts

本文件定义读取、合并、校验和输出的节点合同。实现时可以用 JSON、表格或 Markdown 表达，但字段语义不得漂移。

## Canonical Node Order

1. `ingest_case_bundle`
2. `classify_materials`
3. `extract_subject_slots`
4. `extract_personal_credit_slots`
5. `extract_corporate_credit_slots`
6. `extract_financial_slots`
7. `extract_shuimu_slots`
8. `extract_flow_support_slots`
9. `merge_slots`
10. `validate_consistency`
11. `compute_core_metrics`
12. `decide_priority`
13. `generate_follow_up_questions`
14. `generate_precheck_result`

## Node Result Shell

```json
{
  "node": "extract_subject_slots",
  "status": "passed | degraded | blocked | skipped | failed",
  "inputs": ["material_id"],
  "outputs": {
    "materials": [],
    "slots": [],
    "metrics": [],
    "issues": [],
    "questions": []
  },
  "downgrade_reasons": [],
  "blocked_reason": null
}
```

## Raw Material Contract

```json
{
  "material_id": "m001",
  "name": "客户交接表.xlsx",
  "material_class": "intake | personal_credit | corporate_credit | financial_statement | shuimu | flow_support | other | unknown",
  "source_type": "file | pasted_text | image | spreadsheet | pdf | note",
  "date_or_period": "optional",
  "owner": "user_owned | unknown",
  "privacy_level": "low | medium | high",
  "readability": "readable | partially_readable | unreadable",
  "evidence_rank": 1,
  "notes": "optional"
}
```

## Slot Contract

```json
{
  "name": "financial.revenue",
  "value": 1000000,
  "unit": "CNY",
  "status": "present | missing | inferred | conflicted | not_applicable | not_enough_to_calculate",
  "source_refs": ["m004:income_statement:2025"],
  "confidence": "high | medium | low",
  "body_eligible": false,
  "appendix_table": "financial_statement_summary",
  "notes": "optional"
}
```

## Metric Contract

```json
{
  "name": "metric.debt_pressure_level",
  "value": "high",
  "status": "calculated | not_enough_to_calculate | degraded",
  "inputs": ["personal_credit.current_loan_balance", "financial.net_profit"],
  "source_refs": ["m002:loan_summary", "m004:profit_statement"],
  "notes": "optional"
}
```

## Issue Or Conflict Contract

```json
{
  "issue_id": "i001",
  "type": "subject_conflict | business_conflict | scale_conflict | debt_conflict | time_conflict | missing_material | unreadable_material",
  "severity": "blocker | downgrade | appendix_only | follow_up",
  "field": "business.license_age_months",
  "values": [
    {"value": 8, "source_ref": "m001:intake", "evidence_rank": 5},
    {"value": 14, "source_ref": "m006:license", "evidence_rank": 4}
  ],
  "decision": "block_path | downgrade_path | move_to_appendix_only | trigger_follow_up_question",
  "notes": "optional"
}
```

## Follow-Up Question Contract

```json
{
  "question_id": "q001",
  "targets": ["primary_contradiction"],
  "question": "请确认实际经营主体和申请主体的关系，法人是否参与真实经营？",
  "why_needed": "主体关系会先于额度或产品影响能否继续预检。",
  "required_evidence": ["股权关系", "经营参与说明", "近期开票或流水主体"],
  "priority": 1
}
```

## Enums

### Node Status

- `passed`
- `degraded`
- `blocked`
- `skipped`
- `failed`

### Slot Status

- `present`
- `missing`
- `inferred`
- `conflicted`
- `not_applicable`
- `not_enough_to_calculate`

### Material Class

- `intake`
- `personal_credit`
- `corporate_credit`
- `financial_statement`
- `shuimu`
- `flow_support`
- `other`
- `unknown`

### Contradiction Type

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

## Conflict Handling

### Conflict Types

- `subject_conflict`：主体、实控、股权、法人、申请人关系冲突
- `business_conflict`：行业、经营内容、执照年限、经营地点冲突
- `scale_conflict`：收入、开票、纳税、流水、财报规模冲突
- `debt_conflict`：个人征信、企业征信、财报负债口径冲突
- `time_conflict`：报告日期、期间、业务发生时间不一致

### Evidence Priority

1. 正式征信报告
2. 财务报表
3. 水母报告
4. 银行流水、平台流水、合同、发票等证据
5. 客户自述或销售文本

### Same-Field Multi-Source Rule

同一字段多来源冲突时，不得静默覆盖。保留所有值、来源、证据等级和处理决策，并生成 issue record。

### Decision Outcomes

- `block_path`：冲突导致主体、红线或真实性无法继续预检
- `downgrade_path`：可以继续，但结论必须降级
- `move_to_appendix_only`：冲突不改变路径，进入附录记录
- `trigger_follow_up_question`：冲突直接连接核心矛盾，生成首轮追问

## Node Downgrade Behavior

| Node | Missing Input Behavior |
| --- | --- |
| `ingest_case_bundle` | 无材料则 `blocked`；只有口述则 `degraded` |
| `classify_materials` | 无法分类的材料保留为 `unknown`，不得丢弃 |
| `extract_subject_slots` | 缺主体关系则 `degraded`；无法确认申请主体则 `blocked` |
| `extract_personal_credit_slots` | 缺个人征信则对应槽位 `not_enough_to_calculate`，节点 `degraded` |
| `extract_corporate_credit_slots` | 缺企业征信则企业债务结构判断 `degraded` |
| `extract_financial_slots` | 缺财报则表内承载能力 `not_enough_to_calculate` |
| `extract_shuimu_slots` | 缺水母则经营画像和税票趋势 `degraded` |
| `extract_flow_support_slots` | 缺流水则现金流可见度 `degraded`，节点可 `skipped` |
| `merge_slots` | 冲突字段标为 `conflicted` 并输出 issue |
| `validate_consistency` | 缺少正式证据时不得输出确定性一致结论 |
| `compute_core_metrics` | 输入不足的指标标为 `not_enough_to_calculate` |
| `decide_priority` | 无足够材料时核心矛盾为 `material_gap` |
| `generate_follow_up_questions` | 最多两个问题；无核心矛盾时问关键材料而非泛化清单 |
| `generate_precheck_result` | 输入不足时输出 `need_key_info`，不得推荐银行或产品 |
