import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Task } from "@/types";
import { toast } from "sonner";
import { formatDateToYYYYMMDD, convertToISO } from "@/lib/utils";

interface EditTaskModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onEditTask: (updatedTask: Task) => void;
  taskToEdit: Task | null;
}

export const EditTaskModal = ({
  isOpen,
  onOpenChange,
  onEditTask,
  taskToEdit,
}: EditTaskModalProps) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [color, setColor] = useState("");

  useEffect(() => {
    if (taskToEdit) {
      setTitle(taskToEdit.title);
      setDescription(taskToEdit.description || "");
      setStartDate(formatDateToYYYYMMDD(taskToEdit.startDate));
      setEndDate(formatDateToYYYYMMDD(taskToEdit.endDate));
      setColor(taskToEdit.color);
    }
  }, [taskToEdit, isOpen]);

  const handleSave = () => {
    if (!title || !startDate || !endDate || !color) {
      toast.error("Please fill in all required fields.");
      return;
    }

    const start = new Date(startDate);
    const end = new Date(endDate);

    if (end < start) {
      toast.error("End date cannot be before start date.");
      return;
    }

    if (taskToEdit) {
      onEditTask({
        ...taskToEdit,
        title,
        description,
        startDate: convertToISO(startDate),
        endDate: convertToISO(endDate),
        color,
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit task</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="title" className="text-right">
              Title
            </Label>
            <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-right">
              Description
            </Label>
            <Textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="start-date" className="text-right">
              Start Date
            </Label>
            <Input id="start-date" type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="end-date" className="text-right">
              End Date
            </Label>
            <Input id="end-date" type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="color" className="text-right">
              Color
            </Label>
            <Input id="color" type="color" value={color} onChange={(e) => setColor(e.target.value)} className="col-span-3" />
          </div>
        </div>
        <Button onClick={handleSave}>Save changes</Button>
      </DialogContent>
    </Dialog>
  );
};
