import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Task } from "@/types";

interface TaskListProps {
  tasks: Task[];
  selectedTasks: number[];
  setSelectedTasks: (tasks: number[]) => void;
  onDeleteClick: (taskId: number) => void;
  onEditClick: (task: Task) => void;
  onExportClick: () => void;
}

export const TaskList = ({
  tasks,
  selectedTasks,
  setSelectedTasks,
  onDeleteClick,
  onEditClick,
  onExportClick,
}: TaskListProps) => {
  return (
    <section>
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-xl font-semibold">Task List</h2>
        <Button onClick={onExportClick} disabled={selectedTasks.length === 0}>
          Export TaskLine (.xlsx)
        </Button>
      </div>
      <div className="border rounded-lg">
        <div className="grid grid-cols-6 gap-4 p-4 font-bold border-b">
          <div className="col-span-1">
            <Checkbox
              onCheckedChange={(checked) => {
                if (checked) {
                  setSelectedTasks(tasks.map((task) => task.id));
                } else {
                  setSelectedTasks([]);
                }
              }}
            />
          </div>
          <div className="col-span-2">Title</div>
          <div>Start Date</div>
          <div>End Date</div>
          <div>Actions</div>
        </div>
        {tasks.map((task) => (
          <div key={task.id} className="grid grid-cols-6 gap-4 p-4 border-b items-center">
            <div className="col-span-1">
              <Checkbox
                checked={selectedTasks.includes(task.id)}
                onCheckedChange={(checked) => {
                  if (checked) {
                    setSelectedTasks([...selectedTasks, task.id]);
                  } else {
                    setSelectedTasks(selectedTasks.filter((id) => id !== task.id));
                  }
                }}
              />
            </div>
            <div className="col-span-2 flex items-center">
              <div
                className="w-4 h-4 rounded-full mr-2"
                style={{ backgroundColor: task.color }}
              ></div>
              {task.title}
            </div>
            <div>{task.startDate}</div>
            <div>{task.endDate}</div>
            <div>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" size="sm">...</Button>
                </PopoverTrigger>
                <PopoverContent className="w-40">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full justify-start"
                    onClick={() => onEditClick(task)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full justify-start text-red-500"
                    onClick={() => onDeleteClick(task.id)}
                  >
                    Delete
                  </Button>
                </PopoverContent>
              </Popover>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
