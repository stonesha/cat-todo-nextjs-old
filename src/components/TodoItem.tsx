import { type Todo } from "@prisma/client";
import { PencilIcon } from "@heroicons/react/24/outline";
import { formatRelative } from "date-fns";

interface TodoItemProps {
  todo: Todo;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo }) => {
  const relative_completed_by = formatRelative(todo.complete_by, new Date());

  return (
    <>
      <div className="flex w-full flex-row items-center justify-between rounded-md border-2 border-black px-2 py-2 shadow-md">
        <input
          type="checkbox"
          className="border-3 h-6 w-6 cursor-pointer rounded-lg checked:bg-green-500"
        />
        <div>
          <p className="text-xl font-medium">{todo.title}</p>
          <p className="text-sm font-normal">{relative_completed_by}</p>
        </div>
        <button className="h-6 w-6 rounded-md bg-blue-500 p-1 text-white hover:bg-blue-700">
          <PencilIcon className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>
    </>
  );
};

export default TodoItem;
