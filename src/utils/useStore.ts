import { type Todo } from "@prisma/client";
import create from "zustand";
import { devtools } from "zustand/middleware";

interface State {
  editModalIsOpen: boolean;
  setEditModalIsOpen: (isOpen: boolean) => void;
  currentTodo: Todo | undefined;
  setCurrentTodo: (todo: Todo) => void;
}

const useStore = create<State>()(
  devtools((set) => ({
    editModalIsOpen: false,
    setEditModalIsOpen: (isOpen: boolean) =>
      set(() => ({ editModalIsOpen: isOpen })),
    currentTodo: undefined,
    setCurrentTodo: (todo: Todo) => set(() => ({ currentTodo: todo })),
  }))
);

export default useStore;
