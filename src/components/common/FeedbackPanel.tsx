interface FeedbackPanelProps {
  message: string;
  align?: "left" | "center";
}

const FeedbackPanel = ({ message, align = "left" }: FeedbackPanelProps) => {
  return (
    <div
      className={`rounded-xl border border-white/10 bg-(--color-surface)/60 px-5 py-6 ${
        align === "center" ? "text-center" : ""
      }`}>
      <p className="text-sm text-(--color-text-secondary)">{message}</p>
    </div>
  );
};

export default FeedbackPanel;
