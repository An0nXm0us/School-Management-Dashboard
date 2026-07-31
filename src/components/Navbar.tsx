import Image from "next/image"
import { getCurrentUser } from "@/lib/auth";
import ThemeToggle from "./ThemeToggle";

const Navbar = () => {
    const user = getCurrentUser();

    return (
        <div className="flex items-center justify-between p-4 bg-card/80 backdrop-blur border-b border-border">
            {/*Search Bar*/}
            <div className="hidden md:flex items-center gap-2 text-xs rounded-full ring-1 ring-border px-3 py-1.5 bg-background focus-within:ring-2 focus-within:ring-ring">
                <Image src="/search.png" alt="search" width={15} height={15} className="dark:invert opacity-70" />
                <input
                    type="text"
                    placeholder="Search..."
                    className="bg-transparent outline-none text-foreground placeholder:text-muted-foreground"
                />
            </div>

            {/*Profile Section*/}
            <div className="flex items-center gap-4 justify-end w-full">
                <ThemeToggle />
                <div className="bg-muted rounded-full w-7 h-7 flex items-center justify-center cursor-pointer hover:bg-border transition-colors">
                    <Image src="/message.png" alt="" width={20} height={20} className="dark:invert" />
                </div>
                <div className="bg-muted rounded-full w-7 h-7 flex items-center justify-center cursor-pointer relative hover:bg-border transition-colors">
                    <Image src="/announcement.png" alt="" width={20} height={20} className="dark:invert" />
                    <div className="absolute -top-2 -right-2 w-4 h-4 flex items-center justify-center bg-success text-white rounded-full text-[10px]">1</div>
                </div>
                <div className="flex flex-col">
                    <span className="text-xs leading-3 font-medium">{user?.name ?? "Guest"}</span>
                    <span className="text-[10px] text-muted-foreground text-right capitalize">{user?.role ?? ""}</span>
                </div>
                <Image src="/avatar.png" alt="" width={36} height={36} className="rounded-full border border-border"/>
            </div>
        </div>
    )
}

export default Navbar
