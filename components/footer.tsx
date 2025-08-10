export default function Footer() {
  const currentYear: number = new Date().getFullYear();

  return (
    <footer className="border-t w-full">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-row justify-between items-center w-full gap-1">
          <p className="text-xs text-muted-foreground">
            © {currentYear} DevStack. All rights reserved.
          </p>
          <p className="text-[11px] text-muted-foreground">
            Built with <span className="font-medium">TypeScript</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
