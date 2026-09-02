# Sample Validation

本文件定义真实样本验证规则。默认使用用户自有样本，缺口记录在 `sample-index.md`。

## Required Categories

### Strong Case

Purpose:

- 验证小额信用卡、中等查询、轻微瑕疵不抢正文
- 验证输出可以是 `continue_precheck`

Expected:

- `primary_contradiction` 可以是 `no_primary_contradiction` 或明确的低风险路径问题
- 信用卡和查询细节在附录
- 不应第一轮追问额度、产品、银行或期限

### Cautious-Business Case

Purpose:

- 验证行业或经营清场风险能优先于普通能力测算

Expected:

- `primary_contradiction` 为 `business_preference` 或 `clearance_risk`
- 科技标签只能作为粗路由补充
- 不应第一轮问产品匹配

### Subject-Misalignment Case

Purpose:

- 验证申请主体、经营主体、实控人、法人或股东关系不清时，主体问题优先于承载能力

Expected:

- `primary_contradiction` 为 `subject_alignment`
- 首轮问题聚焦主体关系和证据
- 不应第一轮要求泛化补齐所有材料

### Weak-Visibility / Suspected-Shell Case

Purpose:

- 验证弱经营可见度和疑似空壳的边界

Expected:

- 证据不足时用 `operation_reality_visibility`，不要直接下 `suspected_shell`
- 只有多个高质量证据指向空壳时才使用 `suspected_shell`
- 不应把缺水母或缺流水本身等同于空壳

### Anti-Over-Suppression Case

Purpose:

- 验证通常被压制的小问题，在叠加弱主体、弱可见度或重债务时可以提升

Expected:

- 小问题不得单独成为核心矛盾
- 小问题可作为 `capacity`、`subject_alignment` 或 `operation_reality_visibility` 的证据
- 输出必须说明为什么这次没有继续压制

## Safe Use Policy

- 优先使用用户自有真实样本或脱敏摘要
- 只在缺少某类边界样本时创建极小 synthetic fixture
- 不为了适配 schema 改写业务事实
- 不把敏感原始征信、流水、身份证、手机号或未脱敏聊天记录复制进技能文档
- 样本验证记录只保存别名、路径指针、类别、可用性和脱敏状态

## Validation Record Template

```markdown
## Sample Validation

- Alias:
- Category:
- Result: pass | degraded_pass | fail
- Material classes present:
- Primary contradiction:
- Suppressed noise:
- First-round questions:
- What should never be asked first:
- Notes:
```

## Initial Paper Validation

- Alias: `merchant-loan-restaurant-license-8m`
- Category: strong case
- Result: degraded_pass
- Material classes present: intake summary / redacted case note
- Primary contradiction: `no_primary_contradiction` or low-risk `operation_reality_visibility` pending formal materials
- Suppressed noise: formal credit, corporate credit, financial, Shuimu and flow details are not present, so they must degrade instead of being invented
- First-round questions: ask for the one or two formal materials that verify real operation and subject alignment, not a full generic checklist
- What should never be asked first: bank, product, quota, tenor or repair plan
- Notes: This is a paper check on an existing redacted summary. It proves slot destinations for the visible fields, not full case validation.
