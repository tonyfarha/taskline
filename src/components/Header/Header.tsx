import { ThemeToggle } from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";
import { DialogTrigger } from "@/components/ui/dialog";

interface HeaderProps {
  onCreateTaskClick: () => void;
}

export const Header = ({ onCreateTaskClick }: HeaderProps) => {
  return (
    <header className="flex justify-between items-center mb-4">
      <h1 className="text-2xl font-bold">TaskLine</h1>
      <div className="flex items-center gap-4">
        <ThemeToggle />
        <DialogTrigger asChild>
          <Button onClick={onCreateTaskClick}>Create Task</Button>
        </DialogTrigger>
      </div>
    </header>
  );
};
