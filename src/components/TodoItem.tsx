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
      </div>
    </>
  );
};

export default TodoItem;
