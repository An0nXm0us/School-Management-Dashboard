import Image from "next/image";

const badgeStyles: Record<string, string> = {
  admin: "bg-tagPurple text-tagPurple-foreground",
  teacher: "bg-tagBlue text-tagBlue-foreground",
  student: "bg-tagAmber text-tagAmber-foreground",
  parent: "bg-tagGreen text-tagGreen-foreground",
};

const icons: Record<string, string> = {
  admin: "/profile.png",
  teacher: "/teacher.png",
  student: "/student.png",
  parent: "/parent.png",
};

const UserCard = ({ type, count }: { type: string; count: number }) => {
    return (
      <div className="bg-card border border-border shadow-sm rounded-xl p-4 flex-1 min-w-[130px]">
        <div className="flex justify-between items-center">
          <span
            className={`w-8 h-8 flex items-center justify-center rounded-full ${
              badgeStyles[type] ?? badgeStyles.teacher
            }`}
          >
            <Image src={icons[type] ?? "/profile.png"} alt="" width={16} height={16} className="dark:invert" />
          </span>
          <span className="text-[10px] bg-muted px-2 py-1 rounded-full text-muted-foreground">2025/26</span>
        </div>
        <h1 className="text-2xl font-semibold my-4">{count.toLocaleString()}</h1>
        <h2 className="capitalize text-sm font-medium text-muted-foreground">{type}s</h2>
      </div>
    );
};

export default UserCard
