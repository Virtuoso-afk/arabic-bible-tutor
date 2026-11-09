import { BookIcon, ChatIcon, SparkIcon } from "./icons";

const nodes = [
  { label: "مورد موثوق", Icon: BookIcon, className: "visual-node--resource" },
  { label: "درس موجّه", Icon: SparkIcon, className: "visual-node--lesson" },
  { label: "تأمل وحوار", Icon: ChatIcon, className: "visual-node--reflection" },
];

export function LearningVisual() {
  return (
    <div className="learning-visual" aria-label="رسم يوضّح انتقال المتعلّم من مورد موثوق إلى درس موجّه ثم تأمل وحوار">
      <div className="learning-visual__glow" />
      <div className="learning-visual__path" aria-hidden="true" />
      {nodes.map(({ label, Icon, className }, index) => (
        <div className={`visual-node ${className}`} key={label}>
          <span className="visual-node__number">{String(index + 1).padStart(2, "0")}</span>
          <span className="visual-node__icon"><Icon /></span>
          <strong>{label}</strong>
        </div>
      ))}
      <div className="learning-visual__center" aria-hidden="true">
        <span>تعلّم</span>
        <strong>بإيقاعك</strong>
      </div>
    </div>
  );
}
