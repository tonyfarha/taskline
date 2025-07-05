import { Button } from "@/components/ui/button";
import { DialogTrigger } from "@/components/ui/dialog";

interface HeaderProps {
  onCreateTaskClick: () => void;
}

export const Header = ({ onCreateTaskClick }: HeaderProps) => {
  return (
    <header className="flex justify-between items-center mb-4">
      <h1 className="text-2xl font-bold">TaskLine</h1>
      <DialogTrigger asChild>
        <Button onClick={onCreateTaskClick}>Create Task</Button>
      </DialogTrigger>
    </header>
  );
};
