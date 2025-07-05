"use client";

import { Toaster } from "sonner";
import { Dialog } from "@/components/ui/dialog";
import { Timeline } from "@/components/Timeline";
import { useTaskManagement } from "@/hooks/useTaskManagement";
import { Header } from "@/components/Header/Header";
import { TaskList } from "@/components/TaskList/TaskList";
import { CreateTaskModal } from "@/components/modals/CreateTaskModal";
import { EditTaskModal } from "@/components/modals/EditTaskModal";
import { DeleteConfirmationModal } from "@/components/modals/DeleteConfirmationModal";

export default function Home() {
  const {
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
    setTaskToDelete,
    handleEditTask,
    handleDeleteTask,
    handleExport,
  } = useTaskManagement();

  return (
    <div className="container mx-auto p-4">
      <Toaster />
      <Dialog open={isCreateTaskModalOpen} onOpenChange={setCreateTaskModalOpen}>
        <Header onCreateTaskClick={() => setCreateTaskModalOpen(true)} />
      </Dialog>

      <main>
        <section className="mb-8">
          {/* <h2 className="text-xl font-semibold mb-2">TasksLine View</h2> */}
          <Timeline tasks={tasks} />
        </section>

        <TaskList
          tasks={tasks}
          selectedTasks={selectedTasks}
          setSelectedTasks={setSelectedTasks}
          onDeleteClick={(taskId) => {
            setTaskToDelete(taskId);
            setDeleteModalOpen(true);
          }}
          onEditClick={(task) => {
            setTaskToEdit(task);
            setEditModalOpen(true);
          }}
          onExportClick={handleExport}
        />
      </main>

      <CreateTaskModal
        isOpen={isCreateTaskModalOpen}
        onOpenChange={setCreateTaskModalOpen}
        onAddTask={(newTask) => {
          setTasks((prevTasks) => [...prevTasks, { ...newTask, id: prevTasks.length + 1 }]);
          setCreateTaskModalOpen(false);
        }}
      />

      <EditTaskModal
        isOpen={isEditModalOpen}
        onOpenChange={setEditModalOpen}
        onEditTask={handleEditTask}
        taskToEdit={taskToEdit}
        key={taskToEdit?.id || 'new'}
      />

      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onOpenChange={setDeleteModalOpen}
        onConfirm={handleDeleteTask}
      />
    </div>
  );
}
