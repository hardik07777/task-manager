import type { Task } from "../types/task";

interface Props {
  task: Task;
  onDelete: (id: string) => void;
  onStageChange: (
    id: string,
    stage: string
  ) => void;
    onEdit: (task: Task) => void;

}

export default function TaskCard({
  task,
  onDelete,
  onStageChange,
    onEdit,

}: Props) {
  const getBadgeColor = () => {
  switch (task.stage) {
    case "todo":
      return "bg-slate-100 text-slate-700";

    case "in-progress":
      return "bg-amber-100 text-amber-700";

    case "done":
      return "bg-emerald-100 text-emerald-700";

    default:
      return "bg-slate-100 text-slate-700";
  }
};

return (
  <div className="group bg-white rounded-2xl border border-slate-200 p-5 hover:shadow-lg hover:border-slate-300 transition-all duration-200">
    
    <div className="flex items-start justify-between gap-4">
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-slate-900 text-lg">
          {task.title}
        </h3>

        <p className="text-sm text-slate-500 mt-2 line-clamp-2">
          {task.description ||
            "No description provided"}
        </p>
      </div>

      <span
        className={`text-xs font-medium px-3 py-1.5 rounded-full ${getBadgeColor()}`}
      >
        {task.stage === "todo"
          ? "Todo"
          : task.stage === "in-progress"
          ? "In Progress"
          : "Done"}
      </span>
    </div>

    <div className="mt-5 flex items-center justify-between">
      <select
        value={task.stage}
        onChange={(e) =>
          onStageChange(
            task._id,
            e.target.value
          )
        }
        className="text-sm bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-slate-200"
      >
        <option value="todo">
          Todo
        </option>
        <option value="in-progress">
          In Progress
        </option>
        <option value="done">
          Done
        </option>
      </select>

      <div className="flex gap-2">
        <button
          onClick={() => onEdit(task)}
          className="px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-lg transition"
        >
          Edit
        </button>

        <button
          onClick={() =>
            onDelete(task._id)
          }
          className="px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition"
        >
          Delete
        </button>
      </div>
    </div>
  </div>
);


}
