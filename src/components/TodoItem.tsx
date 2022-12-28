import { PencilIcon, TrashIcon } from "@heroicons/react/20/solid";
import { type Todo } from "@prisma/client";
import { formatRelative } from "date-fns";
import { trpc } from "~/utils/trpc";
import { type MouseEvent } from "react";

interface TodoItemProps {
  todo: Todo;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo }) => {
  const relative_completed_by = formatRelative(todo.complete_by, new Date());

  const utils = trpc.useContext();
  const deleteTodo = trpc.todo.delete.useMutation({
    async onSuccess() {
      await utils.todo.all.invalidate();
    },
  });

  const handleDelete = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    deleteTodo.mutate(todo.id);
  };

  return (
    <>
      <div className="flex w-72 flex-row items-center justify-between rounded-md border-2 border-black px-2 py-2 shadow-md md:w-96">
        <div className="flex w-full flex-row items-center overflow-hidden text-ellipsis">
          <input
            type="checkbox"
            className="border-3 mr-4 h-6 w-6 cursor-pointer rounded-lg checked:bg-green-500"
          />
          <div className="shrink">
            <p className="text-xl font-medium">{todo.title}</p>
            <p className="text-sm font-normal">{relative_completed_by}</p>
          </div>
        </div>
        <div className="flex flex-row">
          <button className="ml-2 h-6 w-6 rounded-md bg-blue-500 p-1 text-white hover:bg-blue-700">
            <PencilIcon className="h-4 w-4" aria-hidden="true" />
          </button>
          <button
            className="ml-2 h-6 w-6 rounded-md bg-red-500 p-1 text-white hover:bg-red-700"
            onClick={handleDelete}
          >
            <TrashIcon className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      </div>
    </>
  );
};

export default TodoItem;
