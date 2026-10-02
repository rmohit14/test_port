export default function Tag({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center rounded-full border border-current/20 px-3 py-1 text-[0.7rem] font-medium uppercase tracking-[0.08em] ${className}`}
    >
      {children}
    </span>
  );
}
