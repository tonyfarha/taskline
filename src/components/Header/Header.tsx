import { ThemeToggle } from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";
import { DialogTrigger } from "@/components/ui/dialog";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";
import { CalendarCheck2, ChevronDown, LogOut, Loader2 } from "lucide-react";
import { useState } from "react";

interface HeaderProps {
  onCreateTaskClick: () => void;
}

export const Header = ({ onCreateTaskClick }: HeaderProps) => {
  const { data: session, status } = useSession();
  const userName = session?.user?.name || session?.user?.email || "";
  const userInitials = (userName || "?")
    .split(" ")
    .map((part: string) => part.charAt(0))
    .slice(0, 2)
    .join("")
    .toUpperCase();
  const [isSigningIn, setIsSigningIn] = useState(false);

  return (
    <header className="flex justify-between items-center mb-4 border-b pb-2">
      <h1 className="flex items-center gap-2 text-2xl font-bold">
        <CalendarCheck2 className="h-6 w-6 text-primary" />
        TaskLine
      </h1>
      <div className="flex items-center gap-2 sm:gap-3">
        <ThemeToggle />
        <DialogTrigger asChild>
          <Button onClick={onCreateTaskClick}>Create Task</Button>
        </DialogTrigger>
        {status === "loading" ? (
          <div>Loading...</div>
        ) : session?.user ? (
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="sm" className="flex items-center gap-2">
                {session.user?.image ? (
                  <span className="h-8 w-8 rounded-full overflow-hidden ring-1 ring-border">
                    <Image
                      src={session.user.image}
                      alt="User Avatar"
                      width={32}
                      height={32}
                      className="h-8 w-8 object-cover"
                    />
                  </span>
                ) : (
                  <span className="h-8 w-8 rounded-full bg-muted flex items-center justify-center text-xs font-medium">
                    {userInitials}
                  </span>
                )}
                <span className="hidden sm:block max-w-[140px] truncate text-sm">
                  {userName || "Account"}
                </span>
                <ChevronDown className="h-4 w-4 text-muted-foreground" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-56 p-2">
              <div className="px-1 py-2">
                <div className="text-sm font-medium leading-none truncate">
                  {session.user?.name || session.user?.email}
                </div>
                {session.user?.email && session.user?.name && (
                  <div className="text-xs text-muted-foreground truncate">
                    {session.user.email}
                  </div>
                )}
              </div>
              <div className="my-1 h-px bg-border" />
              <Button
                variant="ghost"
                size="sm"
                className="w-full justify-start"
                onClick={() => signOut()}
              >
                <LogOut className="mr-2 h-4 w-4" />
                Sign out
              </Button>
            </PopoverContent>
          </Popover>
        ) : (
          <Button
            variant="outline"
            onClick={async () => {
              try {
                setIsSigningIn(true);
                await signIn("google");
              } finally {
                setIsSigningIn(false);
              }
            }}
            disabled={isSigningIn}
          >
            {isSigningIn && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Sign in with Google
          </Button>
        )}
      </div>
    </header>
  );
};
