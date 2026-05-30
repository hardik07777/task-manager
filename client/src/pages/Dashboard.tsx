import { useEffect, useState } from "react";
import api from "../services/api";
import Navbar from "../components/Navbar";
import TaskCard from "../components/TaskCard";
import toast from "react-hot-toast";
import type { Task } from "../types/task";

export default function Dashboard() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

const [creating, setCreating] =
  useState(false);

const [editingTask, setEditingTask] =
  useState<Task | null>(null);

const [editTitle, setEditTitle] =
  useState("");

const [
  editDescription,
  setEditDescription,
] = useState("");

  const fetchTasks = async () => {
    try {
      const { data } = await api.get("/tasks");
      setTasks(data);
    } catch {
      toast.error("Failed to load tasks");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const createTask = async () => {
  if (!title.trim()) {
    toast.error("Task title is required");
    return;
  }

  try {
    setCreating(true);

    const { data } = await api.post(
      "/tasks",
      {
        title,
        description,
        stage: "todo",
      }
    );

    setTasks((prev) => [
      data,
      ...prev,
    ]);

    setTitle("");
    setDescription("");

    toast.success("Task created");
  } catch {
    toast.error(
      "Failed to create task"
    );
  } finally {
    setCreating(false);
  }
};

  const deleteTask = async (id: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this task?"
    );

    if (!confirmed) return;

    try {
      await api.delete(`/tasks/${id}`);

      setTasks((prev) =>
        prev.filter((task) => task._id !== id)
      );

      toast.success("Task deleted");
    } catch {
      toast.error("Failed to delete task");
    }
  };

  const updateStage = async (
    id: string,
    stage: string
  ) => {
    try {
      const { data } = await api.put(
        `/tasks/${id}`,
        { stage }
      );

      setTasks((prev) =>
        prev.map((task) =>
          task._id === id ? data : task
        )
      );

      toast.success("Task updated");
    } catch {
      toast.error("Failed to update task");
    }
  };
const handleEdit = (task: Task) => {
  setEditingTask(task);

  setEditTitle(task.title);

  setEditDescription(
    task.description || ""
  );
};
const saveTask = async () => {
  if (!editingTask) return;

  if (!editTitle.trim()) {
    toast.error(
      "Task title is required"
    );
    return;
  }

  try {
    setSaving(true);

    const { data } = await api.put(
      `/tasks/${editingTask._id}`,
      {
        title: editTitle,
        description:
          editDescription,
        stage:
          editingTask.stage,
      }
    );

    setTasks((prev) =>
      prev.map((task) =>
        task._id === data._id
          ? data
          : task
      )
    );

    setEditingTask(null);

    toast.success(
      "Changes saved"
    );
  } catch {
    toast.error(
      "Failed to update task"
    );
  } finally {
    setSaving(false);
  }
};

  const todo = tasks.filter(
    (task) => task.stage === "todo"
  );

  const progress = tasks.filter(
    (task) => task.stage === "in-progress"
  );

  const done = tasks.filter(
    (task) => task.stage === "done"
  );
  const [saving, setSaving] = useState(false);

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="flex items-center justify-center h-[70vh]">
          <p className="text-lg font-medium">
            Loading tasks...
          </p>
        </div>
      </>
    );
  }

return (
  <>
    <Navbar />

    <main className="max-w-7xl mx-auto px-6 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">
            Tasks
          </h1>

          <p className="text-sm text-slate-500 mt-1">
            Manage your work across different stages.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-sm text-slate-500">
            {tasks.length} tasks
          </span>
        </div>
      </div>

      <section className="bg-white border border-slate-200 rounded-xl p-5 mb-8">
        <h2 className="text-sm font-medium text-slate-700 mb-4">
          Create Task
        </h2>

        <div className="space-y-3">
          <input
            placeholder="Task title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-200"
          />

          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) =>
              setDescription(e.target.value)
            }
            rows={3}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-slate-200"
          />

          <div className="flex justify-end">
            <button
              onClick={createTask}
              disabled={creating}
              className="bg-slate-900 text-white px-4 py-2 rounded-lg text-sm hover:bg-slate-800 transition-colors disabled:opacity-50"
            >
              {creating
                ? "Creating..."
                : "Create Task"}
            </button>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <Column
          title="Todo"
          tasks={todo}
          onDelete={deleteTask}
        onEdit={handleEdit}

          onStageChange={updateStage}
        />

        <Column
          title="In Progress"
          tasks={progress}
          onDelete={deleteTask}
          onStageChange={updateStage}
            onEdit={handleEdit}

        />

        <Column
          title="Done"
          tasks={done}
          onDelete={deleteTask}
          onStageChange={updateStage}
            onEdit={handleEdit}

        />
      </section>
    </main>
{editingTask && (
  <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
    <div className="bg-white w-full max-w-xl rounded-2xl border border-slate-200 shadow-2xl overflow-hidden">

      {/* Header */}
      <div className="px-6 py-5 border-b border-slate-100">
        <h2 className="text-xl font-semibold text-slate-900">
          Edit Task
        </h2>

        <p className="text-sm text-slate-500 mt-1">
          Update task title and description.
        </p>
      </div>

      {/* Body */}
      <div className="p-6 space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Title
          </label>

          <input
            value={editTitle}
            onChange={(e) =>
              setEditTitle(e.target.value)
            }
            placeholder="Task title"
            className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-slate-200"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Description
          </label>

          <textarea
            value={editDescription}
            onChange={(e) =>
              setEditDescription(
                e.target.value
              )
            }
            rows={5}
            placeholder="Task description"
            className="w-full border border-slate-300 rounded-xl px-4 py-3 resize-none focus:outline-none focus:ring-2 focus:ring-slate-200"
          />
        </div>
      </div>

      {/* Footer */}
      <div className="px-6 py-4 border-t border-slate-100 flex justify-end gap-3">
        <button
          onClick={() =>
            setEditingTask(null)
          }
          className="px-5 py-2.5 border border-slate-300 rounded-xl text-slate-700 hover:bg-slate-50 transition"
        >
          Cancel
        </button>

        <button
          onClick={saveTask}
          disabled={saving}
          className="px-5 py-2.5 bg-slate-900 text-white rounded-xl hover:bg-slate-800 transition disabled:opacity-50 flex items-center gap-2"
        >
          {saving && (
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
          )}
        
          {saving
            ? "Saving..."
            : "Save Changes"}
        </button>

      </div>
    </div>
  </div>
)}

  </>
);

}

function Column({
  title,
  tasks,
  onDelete,
  onStageChange,
  onEdit
}: any) {
  return (
    <div className="bg-slate-50 border border-slate-200 rounded-xl">
      <div className="px-4 py-3 border-b border-slate-200 flex items-center justify-between">
        <h2 className="font-medium text-slate-800">
          {title}
        </h2>

        <span className="text-xs bg-slate-200 text-slate-700 px-2 py-1 rounded-full">
          {tasks.length}
        </span>
      </div>

      <div className="p-4 min-h-[500px] space-y-3">
        {tasks.length === 0 ? (
          <div className="flex items-center justify-center h-32 text-sm text-slate-400">
            No tasks
          </div>
        ) : (
          tasks.map((task: Task) => (
            <TaskCard
              key={task._id}
              task={task}
              onDelete={onDelete}
              onStageChange={onStageChange}
              onEdit={onEdit}

            />
          ))
        )}
      </div>
    </div>
  );
}