import { trpc } from "~/utils/trpc";
import { type MouseEvent, useRef, useEffect } from "react";
import useStore from "~/utils/useStore";
import { type Todo } from "@prisma/client";

interface TodoFormProps {
  todo?: Todo;
}

const TodoForm: React.FC<TodoFormProps> = ({ todo }) => {
  const titleRef = useRef<HTMLInputElement>(null);
  const dateRef = useRef<HTMLInputElement>(null);
  const timeRef = useRef<HTMLInputElement>(null);

  const setEditModalIsOpen = useStore((state) => state.setEditModalIsOpen);
  const editModalIsOpen = useStore((state) => state.editModalIsOpen);

  const utils = trpc.useContext();
  const addTodo = trpc.todo.add.useMutation({
    async onSuccess() {
      await utils.todo.all.invalidate();
    },
  });

  const handleSubmit = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (
      titleRef?.current?.value &&
      dateRef?.current?.value &&
      timeRef?.current?.value
    ) {
      const input = {
        title: titleRef?.current?.value,
        complete_by: new Date(
          `${dateRef?.current?.value} ${timeRef?.current?.value}`
        ),
      };

      addTodo.mutate(input);
      titleRef.current.value = "";
    }

    if (editModalIsOpen) setEditModalIsOpen(false);
  };

  return (
    <>
      <form className="mb-2 flex flex-col">
        <input
          ref={titleRef}
          type="text"
          maxLength={255}
          placeholder="Title your todo..."
          className="mb-2 rounded-md bg-gray-200 py-1 px-2"
          value={todo?.title}
        />
        <div className="flex flex-row justify-around">
          <input
            ref={dateRef}
            type="date"
            className="mb-2 rounded-md bg-gray-200 py-1 px-2"
            value={todo?.complete_by.toISOString().split("T")[0]}
          />
          <input
            ref={timeRef}
            type="time"
            className="mb-2 rounded-md bg-gray-200 py-1 px-2"
            value={todo?.complete_by.toISOString().split("T")[1]?.split(".")[0]}
          />
        </div>
        <div className="flex flex-row justify-around">
          <button
            type="reset"
            className="flex flex-row items-center justify-center rounded-md border-2 border-white bg-gray-400 px-4 py-2 align-middle text-sm font-medium text-white hover:bg-gray-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
          >
            Reset
          </button>
          <button
            onClick={handleSubmit}
            className="flex flex-row items-center justify-center rounded-md border-2 border-white bg-blue-500 px-4 py-2 align-middle text-sm font-medium text-white hover:bg-blue-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
          >
            Submit
          </button>
        </div>
      </form>
    </>
  );
};

export default TodoForm;
