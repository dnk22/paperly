export default function ConfigFooter() {
  return (
    <div className="mt-auto px-8 py-6 border-t border-border-light dark:border-border-dark text-xs text-text-muted-light dark:text-text-muted-dark flex justify-between">
      <span>v2.4.0-beta</span>
      <span className="flex items-center gap-1">
        <span className="w-2 h-2 rounded-full bg-green-500"></span>
        System Online
      </span>
    </div>
  );
}
