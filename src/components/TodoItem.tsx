import { type Todo } from "@prisma/client";
import { formatRelative } from "date-fns";

interface TodoItemProps {
  todo: Todo;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo }) => {
  const relative_completed_by = formatRelative(todo.complete_by, new Date());

  return (
    <>
      <div className="flex w-72 flex-row items-center rounded-md border-2 border-black px-2 py-2 shadow-md md:w-96">
        <input
          type="checkbox"
          className="border-3 mr-4 h-6 w-6 cursor-pointer rounded-lg checked:bg-green-500"
        />
        <div className="w-56 md:w-80">
          <p className="overflow-hidden text-ellipsis text-xl font-medium">
            {todo.title}
          </p>
          <p className="text-sm font-normal">{relative_completed_by}</p>
        </div>
      </div>
    </>
  );
};

export default TodoItem;
