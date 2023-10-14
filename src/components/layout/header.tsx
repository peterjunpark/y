type HeaderProps = {
  title: string;
};

export function Header({ title }: HeaderProps) {
  return (
    <div className="sticky top-0 z-50 backdrop-blur-md">
      <h1 className="p-3 text-xl font-semibold">{title}</h1>
    </div>
  );
}
