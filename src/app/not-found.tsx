export default function NotFound() {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-4 pt-16">
      <h1 className="font-bold text-2xl">We're so sorry...</h1>
      <p className="text-lg text-muted-foreground">
        The page you are looking for does not exist.
      </p>
    </div>
  );
}
