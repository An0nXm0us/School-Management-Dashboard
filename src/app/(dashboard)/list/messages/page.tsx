import Image from "next/image";

// Messaging/discussion boards are the "Discussion Engine" module from the
// project scope doc — deliberately out of scope for this pass, so this stays
// a placeholder rather than a fake data model.
const MessagesPage = () => {
  return (
    <div className="bg-card text-card-foreground border border-border shadow-sm p-4 rounded-xl flex-1 m-4 mt-0 flex flex-col items-center justify-center gap-4 text-center min-h-[300px]">
      <Image src="/message.png" alt="" width={40} height={40} className="dark:invert opacity-70" />
      <h1 className="text-lg font-semibold">Messages are coming soon</h1>
      <p className="text-sm text-muted-foreground max-w-md">
        Moderated discussion boards and direct messaging are planned as a later module
        (see the project scope document) and aren&apos;t part of this build yet.
      </p>
    </div>
  );
};

export default MessagesPage;
