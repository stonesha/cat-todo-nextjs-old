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
      <div className="dropdown dropdown-end">
        <label
          tabIndex={0}
          className="btn flex w-full flex-row items-center justify-center rounded-md border-2 border-white bg-blue-500 px-2 py-2 align-middle text-sm font-medium text-white hover:bg-blue-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
        >
          <Cog6ToothIcon className="h-5 w-5" aria-hidden="true" />
          <ChevronDownIcon className="h-5 w-5" aria-hidden="true" />
        </label>
        <ul
          tabIndex={0}
          className="dropdown-content menu rounded-box w-52 bg-base-100 p-2 shadow"
        >
          <li>
            <button
              className="group flex w-full items-center rounded-md px-2 py-2 text-sm text-gray-900 hover:bg-blue-500 hover:text-white"
              onClick={() => signOut()}
            >
              <ArrowLeftOnRectangleIcon
                className="mr-2 h-5 w-5"
                aria-hidden="true"
              />
              Sign Out
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ProfileDropdown;
