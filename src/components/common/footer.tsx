import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-accent border-t-2">
      <div className="container mx-auto flex items-center justify-center p-4">
        <Link
          className="text-muted-foreground"
          href="https://github.com/diffiii"
        >
          &copy; {new Date().getFullYear()} Jan Marek
        </Link>
      </div>
    </footer>
  );
}
