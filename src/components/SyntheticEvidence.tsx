import { ArrowRight } from "lucide-react";

export function KolEvidence() {
  return (
    <div className="workflow-evidence" role="img" aria-label="KOL 审核台脱敏流程图">
      {['邮件回复', '精准匹配', 'AI 草稿', '人工批准', '写入飞书'].map((step, index) => (
        <div className="workflow-step" key={step}>
          <span>{String(index + 1).padStart(2, "0")}</span>
          <strong>{step}</strong>
          {index < 4 ? <ArrowRight aria-hidden="true" /> : null}
        </div>
      ))}
      <small>SYNTHETIC FLOW · NO CUSTOMER DATA</small>
    </div>
  );
}

export function TeeniEvidence() {
  return (
    <div className="analysis-evidence" role="img" aria-label="Teeni 对话分析套件脱敏结构图">
      <div>
        <small>MODULE / A</small>
        <strong>每日分析</strong>
        <span>口径确认 · 进度 · 复核 · 导出</span>
      </div>
      <div>
        <small>MODULE / B</small>
        <strong>多维评估</strong>
        <span>证据提取 · 规则评分 · 失败状态</span>
      </div>
      <p>DESENSITIZED SYSTEM MAP</p>
    </div>
  );
}
