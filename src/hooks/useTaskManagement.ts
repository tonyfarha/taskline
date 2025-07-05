import { useState } from "react";
import { toast } from "sonner";
import { Task } from "@/types";
import { exportToXLSX } from "@/lib/export";

export const useTaskManagement = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [selectedTasks, setSelectedTasks] = useState<number[]>([]);
  const [isCreateTaskModalOpen, setCreateTaskModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState<Task | null>(null);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState<number | null>(null);

  // const handleAddTask = (newTaskData: Omit<Task, 'id'>) => {
  //   const { title, description, startDate, endDate, color } = newTaskData;

  //   if (new Date(endDate) < new Date(startDate)) {
  //     toast.error("End date cannot be before start date.");
  //     return;
  //   }

  //   const newTask: Task = {
  //     id: tasks.length + 1,
  //     title,
  //     description,
  //     startDate,
  //     endDate,
  //     color,
  //   };
  //   setTasks([...tasks, newTask]);
  //   toast.success("Task created successfully!");
  //   setCreateTaskModalOpen(false);
  // };

  const handleEditTask = (updatedTask: Task) => {
    if (new Date(updatedTask.endDate) < new Date(updatedTask.startDate)) {
      toast.error("End date cannot be before start date.");
      return;
    }
    setTasks(tasks.map(task => task.id === updatedTask.id ? updatedTask : task));
    toast.success("Task updated successfully!");
    setEditModalOpen(false);
    setTaskToEdit(null);
  };

  const handleDeleteTask = () => {
    if (taskToDelete !== null) {
      setTasks(tasks.filter((task) => task.id !== taskToDelete));
      toast.success("Task deleted successfully!");
      setDeleteModalOpen(false);
      setTaskToDelete(null);
    }
  };

  const handleExport = () => {
    const tasksToExport = tasks.filter(task => selectedTasks.includes(task.id));
    exportToXLSX(tasksToExport)
      .then(() => toast.success("TaskLine exported successfully!"))
      .catch(() => toast.error("Failed to export taskline."));
  };

  return {
    tasks,
    setTasks,
    selectedTasks,
    setSelectedTasks,
    isCreateTaskModalOpen,
    setCreateTaskModalOpen,
    isEditModalOpen,
    setEditModalOpen,
    taskToEdit,
    setTaskToEdit,
    isDeleteModalOpen,
    setDeleteModalOpen,
    taskToDelete,
    setTaskToDelete,
    handleEditTask,
    handleDeleteTask,
    handleExport,
  };
};
