import Link from "next/link";
import Image from "next/image";
import Menu from "@/components/Menu";
import Navbar from "@/components/Navbar";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="h-screen flex">
      {/* Sidebar */}
      <div className="w-[14%] md:w-[18%] lg:w-[20%] xl:w-[14%]  p-4">
        <Link href="/" className="flex items-center justify-center lg:justify-start gap-2">
        <Image src="/logo.png" alt="logo" width={32} height={32} />
        <span className="hidden lg:block font-bold">Secondary High</span>
        </Link>
        <Menu/>
      </div>
      {/* Main Content */}
      <div className="w-[86%] md:w-[82%] lg:w-[80%] xl:w-[86%] bg-[#F7F8FA] overflow-scroll">
        <Navbar />
        {children}
      </div>
    </div>
  );
}