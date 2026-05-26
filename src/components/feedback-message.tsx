type FeedbackMessageProps = {
  type: "success" | "error";
  message: string;
};

export function FeedbackMessage({ type, message }: FeedbackMessageProps) {
  return (
    <div
      className={[
        "rounded-2xl border px-4 py-3 text-sm",
        type === "error" ? "border-neonRed/25 bg-neonRed/10 text-neonRed" : "border-electric/25 bg-electric/10 text-electric",
      ].join(" ")}
    >
      {message}
    </div>
  );
}
