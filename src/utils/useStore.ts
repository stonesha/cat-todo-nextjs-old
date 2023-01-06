import { type Todo } from "@prisma/client";
import create from "zustand";
import { devtools } from "zustand/middleware";

interface State {
  currentTodo: Todo | undefined;
  setCurrentTodo: (todo: Todo) => void;
}

const useStore = create<State>()(
  devtools((set) => ({
    currentTodo: undefined,
    setCurrentTodo: (todo: Todo) => set(() => ({ currentTodo: todo })),
  }))
);

export default useStore;
