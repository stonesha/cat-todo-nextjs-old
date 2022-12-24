import { type Todo } from "@prisma/client";
import {
  EllipsisHorizontalIcon,
  PencilIcon,
} from "@heroicons/react/24/outline";
import { formatRelative } from "date-fns";
import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";

interface TodoItemProps {
  todo: Todo;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo }) => {
  const relative_completed_by = formatRelative(todo.complete_by, new Date());

  return (
    <>
      <div className="flex flex-row items-center justify-between rounded-md border-2 border-black px-4 py-2 align-middle shadow-md">
        <input
          type="checkbox"
          className="border-3 h-6 w-6 cursor-pointer rounded-lg checked:bg-green-500"
        />
        <div>
          <p className="text-xl font-medium">{todo.title}</p>
          <p className="text-sm font-normal">{relative_completed_by}</p>
        </div>
        <Menu as="div" className="relative inline-block text-left">
          <div>
            <Menu.Button>
              <EllipsisHorizontalIcon className="h-5 w-5" />
            </Menu.Button>
          </div>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute right-0 w-fit origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="px-1 py-1 ">
                <Menu.Item>
                  {({ active }) => (
                    <button
                      className={`${
                        active ? "bg-blue-500 text-white" : "text-gray-900"
                      } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                    >
                      <PencilIcon className="mr-2 h-5 w-5" aria-hidden="true" />
                      Edit
                    </button>
                  )}
                </Menu.Item>
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
    </>
  );
};

export default TodoItem;
