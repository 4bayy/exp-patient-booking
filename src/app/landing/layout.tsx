import Footer from "@/components/Footer";
import Header from "../../components/Header";

interface AppLayoutProps {
  children: React.ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>{children}</main>
      <Footer></Footer>
    </div>
  );
}