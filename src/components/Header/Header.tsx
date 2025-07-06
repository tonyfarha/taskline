import { ThemeToggle } from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";
import { DialogTrigger } from "@/components/ui/dialog";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";

interface HeaderProps {
  onCreateTaskClick: () => void;
}

export const Header = ({ onCreateTaskClick }: HeaderProps) => {
  const { data: session, status } = useSession();

  return (
    <header className="flex justify-between items-start mb-4">
      <h1 className="text-2xl font-bold">TaskLine</h1>
      <div className="flex items-center gap-4">
        <ThemeToggle />
        <DialogTrigger asChild>
          <Button onClick={onCreateTaskClick}>Create Task</Button>
        </DialogTrigger>
        {status === "loading" ? (
          <div>Loading...</div>
        ) : session?.user ? (
          <Popover>
            <PopoverTrigger asChild>
              <div className="cursor-pointer">
                {session.user?.image && (
                  <Image
                    src={session.user.image}
                    alt="User Avatar"
                    width={32}
                    height={32}
                    className="rounded-full"
                  />
                )}
              </div>
            </PopoverTrigger>
            <PopoverContent className="w-40 p-2">
              <Button
                variant="ghost"
                size="sm"
                className="w-full justify-start"
                onClick={() => signOut()}
              >
                Sign out
              </Button>
            </PopoverContent>
          </Popover>
        ) : (
          <Button onClick={() => signIn("google")}>Sign in with Google</Button>
        )}
      </div>
    </header>
  );
};
