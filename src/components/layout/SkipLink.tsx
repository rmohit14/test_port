export default function SkipLink() {
  return (
    <a
      href="#main-content"
      className="fixed left-4 top-4 z-[100] -translate-y-24 rounded-full bg-ink px-5 py-3 text-sm font-medium text-paper opacity-0 transition-all duration-200 focus-visible:translate-y-0 focus-visible:opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
    >
      Skip to main content
    </a>
  );
}
