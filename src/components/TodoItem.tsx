import { PencilIcon, TrashIcon } from "@heroicons/react/20/solid";
import { type Todo } from "@prisma/client";
import { formatRelative, format } from "date-fns";
import { trpc } from "~/utils/trpc";
import { type ChangeEvent, type MouseEvent } from "react";
import useStore from "~/utils/useStore";

interface TodoItemProps {
  todo: Todo;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo }) => {
  let relative_completed_by = formatRelative(todo.complete_by, new Date());
  if (!relative_completed_by.includes(":")) {
    relative_completed_by += " " + format(todo.complete_by, "hh:mm aaaa");
  }

  const setCurrentTodo = useStore((state) => state.setCurrentTodo);

  const utils = trpc.useContext();

  const editTodo = trpc.todo.edit.useMutation({
    async onSuccess() {
      await utils.todo.all.invalidate();
    },
  });

  const deleteTodo = trpc.todo.delete.useMutation({
    /*
    // Old Code in case we want this restored
    async onSuccess() {
      await utils.todo.all.invalidate();
    }
    */

    // Ripped from https://github.com/trpc/examples-next-prisma-todomvc/blob/7002f196fe9d563703ddc60940920bd11b664ee4/src/pages/%5Bfilter%5D.tsx
    // Understanding is that the onMutate triggers when the request is sent
    // and the getdata and setdata are used to perform immediate updates to the front end instead of waiting for a rerender to update the data
    async onMutate() {
      await utils.todo.all.invalidate();
      const allTasks = utils.todo.all.getData();
      if (!allTasks) {
        return;
      }
      utils.todo.all.setData(
        undefined,
        allTasks.filter((t) => t.id != todo.id)
      );
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
            className={`border-3 ${
              todo?.completed ? "checkbox-success" : "checkbox-info"
            } checkbox ml-1 mr-4 h-6 w-6 cursor-pointer rounded-lg`}
            onChange={(e) => handleComplete(e)}
            checked={todo?.completed}
          />

          <div className="shrink">
            <p className="text-xl font-medium">{todo.title}</p>
            <p className="text-sm font-normal">{relative_completed_by}</p>
          </div>
        </div>
        <div className="flex flex-row">
          <div className="tooltip tooltip-info ml-2" data-tip="Edit">
            <label
              className="btn-xs btn rounded-md bg-blue-500 text-white hover:bg-blue-700"
              onClick={() => {
                setCurrentTodo(todo);
              }}
              htmlFor="todo-edit-modal"
            >
              <PencilIcon className="h-4 w-4" aria-hidden="true" />
            </label>
          </div>

          <div className="tooltip tooltip-error ml-1" data-tip="Delete">
            <button
              className="btn-xs btn rounded-md bg-red-500 text-white hover:bg-red-700"
              onClick={handleDelete}
            >
              <TrashIcon className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default TodoItem;
