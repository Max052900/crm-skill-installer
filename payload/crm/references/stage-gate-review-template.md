# Stage-Gate Review Template

```markdown
## Review

- Stage:
- Sample alias:
- Sample path or pointer:
- Result: pass | degraded_pass | fail
- Top blocker:
- Single next action:

### Evidence

- Material classes read:
- client_tier（分档，报告层）:
- Primary contradiction（系统层）:
- Secondary tracks:
- Suppressed noise:
- Follow-up questions（系统层）:
- 下一步推进动作（报告层）:

### Notes

- Privacy handling:
- Missing materials:
- Scope guardrail check:
```

## Result Rules

Use `pass` only when the stage hard gates are satisfied.

Use `degraded_pass` when the stage can continue but the output must carry an explicit downgrade reason.

Use `fail` when a blocker exists or when the output drifts into capability 3/4.
