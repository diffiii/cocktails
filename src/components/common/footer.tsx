import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-accent border-t-2">
      <div className="container mx-auto flex items-center justify-center gap-1 p-4 text-muted-foreground">
        &copy; {new Date().getFullYear()}
        <Link
          className="underline underline-offset-2"
          href="https://github.com/diffiii"
        >
          Jan Marek
        </Link>
      </div>
    </footer>
  );
}
