import { trpc } from "~/utils/trpc";
import { type MouseEvent, useRef } from "react";

const TodoForm: React.FC = () => {
  const titleRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);

  const utils = trpc.useContext();
  const addTodo = trpc.todo.add.useMutation({
    async onSuccess() {
      await utils.todo.all.invalidate();
    },
  });

  const handleSubmit = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (titleRef?.current?.value) {
      const input = {
        title: titleRef?.current?.value,
        description: descriptionRef?.current?.value,
      };

      addTodo.mutate(input);
    }
  };

  return (
    <>
      <form className="flex flex-col">
        <input
          ref={titleRef}
          placeholder="Title your todo..."
          className="mb-2 rounded-md bg-gray-200 py-1 px-2"
        />
        <textarea
          ref={descriptionRef}
          placeholder="Describe your todo..."
          className="mb-3 rounded-md bg-gray-200 py-1 px-2"
        />
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
