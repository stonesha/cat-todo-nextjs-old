import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import {
  ChevronDownIcon,
  ArrowLeftOnRectangleIcon,
  Cog6ToothIcon,
  UserCircleIcon,
} from "@heroicons/react/20/solid";
import { signOut, useSession } from "next-auth/react";

const ProfileDropdown: React.FC = () => {
  const { data: sessionData } = useSession();
  return (
    <div className="fixed top-5 right-5 flex flex-row items-center align-middle">
      {sessionData?.user?.image ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={sessionData?.user?.image}
          alt="profile pic"
          className="mr-1 h-9 w-9 rounded-md"
        />
      ) : (
        <UserCircleIcon className="h-5 w-5" aria-hidden="true" />
      )}
      <div className="w-42 text-right">
        <Menu as="div" className="relative inline-block text-left">
          <div>
            <Menu.Button className="flex w-full flex-row items-center justify-center rounded-md border-2 border-white bg-blue-500 px-2 py-2 align-middle text-sm font-medium text-white hover:bg-blue-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
              <Cog6ToothIcon className="h-5 w-5" aria-hidden="true" />
              <ChevronDownIcon className="h-5 w-5" aria-hidden="true" />
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
            <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="px-1 py-1 ">
                <Menu.Item>
                  {({ active }) => (
                    <button
                      className={`${
                        active ? "bg-blue-500 text-white" : "text-gray-900"
                      } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                      onClick={() => signOut()}
                    >
                      <ArrowLeftOnRectangleIcon
                        className="mr-2 h-5 w-5"
                        aria-hidden="true"
                      />
                      Sign Out
                    </button>
                  )}
                </Menu.Item>
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
    </div>
  );
};

export default ProfileDropdown;
