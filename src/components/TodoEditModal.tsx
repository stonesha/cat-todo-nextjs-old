import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import useStore from "~/utils/useStore";
import TodoForm from "~/components/TodoForm";

const TodoEditModal: React.FC = () => {
  const setEditModalIsOpen = useStore((state) => state.setEditModalIsOpen);
  const editModalIsOpen = useStore((state) => state.editModalIsOpen);

  const currentTodo = useStore((state) => state.currentTodo);

  return (
    <>
      <Transition appear show={editModalIsOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => setEditModalIsOpen(false)}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Editing Todo
                  </Dialog.Title>
                  <div className="mt-2">
                    <TodoForm todo={currentTodo} />
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default TodoEditModal;
