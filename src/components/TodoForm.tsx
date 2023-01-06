import { trpc } from "~/utils/trpc";
import { type Todo } from "@prisma/client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import format from "date-fns/format";
import * as z from "zod";
import { useEffect } from "react";

interface TodoFormProps {
  todo?: Todo;
}

const schema = z.object({
  title: z.string().min(1, { message: "Required" }),
  date: z.string().optional(),
  time: z.string().optional(),
});

type TodoFormSchemaType = z.infer<typeof schema>;

const TodoForm: React.FC<TodoFormProps> = ({ todo }) => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
    reset,
  } = useForm<TodoFormSchemaType>({
    resolver: zodResolver(schema),
  });

  const utils = trpc.useContext();
  const addTodo = trpc.todo.add.useMutation({
    async onSuccess() {
      await utils.todo.all.invalidate();
    },
  });

  const editTodo = trpc.todo.edit.useMutation({
    async onSuccess() {
      await utils.todo.all.invalidate();
    },
  });

  const setEditModalIsOpen = useStore((state) => state.setEditModalIsOpen);

  useEffect(() => {
    if (todo) {
      const defaultValues: TodoFormSchemaType = {
        title: todo.title,
        date: format(todo.complete_by, "yyyy-MM-dd"),
        time: format(todo.complete_by, "HH:mm"),
      };
      reset({ ...defaultValues });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [todo]);

  const onSubmit = async (data: TodoFormSchemaType) => {
    if (todo) {
      const input = {
        title: data.title,
        complete_by: new Date(`${data.date} ${data.time}`),
        userId: todo.userId,
        completed: todo.completed,
      };

      editTodo.mutate({ id: todo.id, data: input });
    } else {
      const input = {
        title: data.title,
        complete_by: new Date(`${data.date} ${data.time}`),
      };
      addTodo.mutate(input);
    }
  };

  return (
    <>
      <form className="mb-2 flex flex-col" onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register("title")}
          type="text"
          maxLength={255}
          placeholder="Title your todo..."
          className="mb-2 rounded-md bg-gray-200 py-1 px-2"
          disabled={isSubmitting}
        />
        <div className="flex flex-row justify-around">
          <input
            {...register("date")}
            type="date"
            className="mb-2 rounded-md bg-gray-200 py-1 px-2"
            disabled={isSubmitting}
          />
          <input
            {...register("time")}
            type="time"
            className="mb-2 rounded-md bg-gray-200 py-1 px-2"
            disabled={isSubmitting}
          />
        </div>
        <div className="flex flex-row justify-around">
          {todo ? (
            <></>
          ) : (
            <button
              type="reset"
              className="flex flex-row items-center justify-center rounded-md border-2 border-white bg-gray-400 px-4 py-2 align-middle text-sm font-medium text-white hover:bg-gray-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
            >
              Reset
            </button>
          )}
          <button
            type="submit"
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
