import { PencilIcon, TrashIcon } from "@heroicons/react/20/solid";
import { type Todo } from "@prisma/client";
import { formatRelative } from "date-fns";
import { trpc } from "~/utils/trpc";
import { type ChangeEvent, type MouseEvent } from "react";
import useStore from "~/utils/useStore";

import "hint.css";

interface TodoItemProps {
  todo: Todo;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo }) => {
  const relative_completed_by = formatRelative(todo.complete_by, new Date());

  const setEditModalIsOpen = useStore((state) => state.setEditModalIsOpen);
  const setCurrentTodo = useStore((state) => state.setCurrentTodo);

  const utils = trpc.useContext();

  const editTodo = trpc.todo.edit.useMutation({
    async onSuccess() {
      await utils.todo.all.invalidate();
    },
  });

  const deleteTodo = trpc.todo.delete.useMutation({
    async onSuccess() {
      await utils.todo.all.invalidate();
    },
  });

  const handleDelete = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    deleteTodo.mutate(todo.id);
  };

  const handleComplete = (e: ChangeEvent<HTMLInputElement>) => {
    const checked = e.currentTarget.checked;

    editTodo.mutate({
      id: todo.id,
      data: { completed: checked },
    });
  };

  return (
    <>
      <div className="flex w-72 flex-row items-center justify-between rounded-md border-2 border-black px-2 py-2 shadow-md md:w-96">
        <div className="flex w-full flex-row items-center overflow-x-hidden text-ellipsis">
          <input
            type="checkbox"
            className="border-3 ml-1 mr-4 h-6 w-6 cursor-pointer rounded-lg checked:bg-green-500"
            onChange={handleComplete}
          />

          <div className="shrink">
            <p className="text-xl font-medium">{todo.title}</p>
            <p className="text-sm font-normal">{relative_completed_by}</p>
          </div>
        </div>
        <div className="flex flex-row">
          <span
            className="hint--bounce hint--bottom hint--rounded hint--info ml-2 w-fit"
            aria-label="Edit"
          >
            <button
              className="h-6 w-6 rounded-md bg-blue-500 p-1 text-white hover:bg-blue-700"
              onClick={() => {
                setEditModalIsOpen(true);
                setCurrentTodo(todo);
              }}
            >
              <PencilIcon className="h-4 w-4" aria-hidden="true" />
            </button>
          </span>

          <span
            className="hint--bounce hint--bottom hint--rounded hint--error ml-2 w-fit"
            aria-label="Delete"
          >
            <button
              className="h-6 w-6 rounded-md bg-red-500 p-1 text-white hover:bg-red-700"
              onClick={handleDelete}
            >
              <TrashIcon className="h-4 w-4" aria-hidden="true" />
            </button>
          </span>
        </div>
      </div>
    </>
  );
};

export default TodoItem;
