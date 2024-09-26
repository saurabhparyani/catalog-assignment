import { ModeToggle } from "@/components/mode-toggle";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="relative min-h-screen">
      <div className="absolute right-10 top-10 z-50">
        <ModeToggle />
      </div>
      {children}
    </div>
  );
};

export default Layout;
