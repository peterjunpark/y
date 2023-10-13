type HeaderProps = {
  title: string;
  children?: React.ReactNode;
};

export function Header({ children, title }: HeaderProps) {
  return (
    <div className="h-30 back sticky top-0 z-50 backdrop-blur-md">
      <h1 className="p-3 text-xl font-semibold">{title}</h1>
      <div className="flex justify-around">{children}</div>
    </div>
  );
}
