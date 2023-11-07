import { Menu, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import {
  ChevronDownIcon,
  PencilSquareIcon as PencilSquareIconSolid,
  ArrowLeftOnRectangleIcon as ArrowLeftOnRectangleIconSolid,
  ArrowRightOnRectangleIcon as ArrowRightOnRectangleIconSolid,
  UserPlusIcon as UserPlusIconSolid,
} from '@heroicons/react/24/solid';
import {
  PencilSquareIcon as PencilSquareIconOutline,
  ArrowLeftOnRectangleIcon as ArrowLeftOnRectangleIconOutline,
  ArrowRightOnRectangleIcon as ArrowRightOnRectangleIconOutline,
  UserPlusIcon as UserPlusIconOutline,
} from '@heroicons/react/24/outline';
import Image from 'next/image';
import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';

export default function AuthMenu() {
  const { data: session, status } = useSession();

  return (
    <div className="ml-auto">
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className="flex w-full items-center justify-center px-4 py-2">
            <Image
              priority
              src={
                session?.user.image
                  ? `/uploads/${session.user.image}`
                  : '/assets/images/avatar.png'
              }
              alt={session?.user.name ?? 'Member'}
              width={40}
              height={40}
              className="rounded-full"
            />
            <ChevronDownIcon
              className="-mr-1 ml-2 h-5 w-5 text-violet-200 hover:text-violet-100"
              aria-hidden="true"
            />
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
          <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
            <div className="px-1 py-1 ">
              {status === 'authenticated' && (
                <>
                  <Menu.Item>
                    {({ active }) => (
                      <Link
                        href="/auth/profile"
                        className={`${
                          active ? 'bg-violet-500 text-white' : 'text-gray-900'
                        } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                      >
                        {active ? (
                          <PencilSquareIconSolid
                            className="mr-2 h-5 w-5"
                            aria-hidden="true"
                          />
                        ) : (
                          <PencilSquareIconOutline
                            className="mr-2 h-5 w-5"
                            aria-hidden="true"
                          />
                        )}
                        Edit
                      </Link>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={() => signOut()}
                        className={`${
                          active ? 'bg-violet-500 text-white' : 'text-gray-900'
                        } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                      >
                        {active ? (
                          <ArrowRightOnRectangleIconSolid
                            className="mr-2 h-5 w-5"
                            aria-hidden="true"
                          />
                        ) : (
                          <ArrowRightOnRectangleIconOutline
                            className="mr-2 h-5 w-5"
                            aria-hidden="true"
                          />
                        )}
                        Sign Out
                      </button>
                    )}
                  </Menu.Item>
                </>
              )}
              {status === 'unauthenticated' && (
                <>
                  <Menu.Item>
                    {({ active }) => (
                      <Link
                        href="/auth/sign-up"
                        className={`${
                          active ? 'bg-violet-500 text-white' : 'text-gray-900'
                        } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                      >
                        {active ? (
                          <UserPlusIconSolid
                            className="mr-2 h-5 w-5"
                            aria-hidden="true"
                          />
                        ) : (
                          <UserPlusIconOutline
                            className="mr-2 h-5 w-5"
                            aria-hidden="true"
                          />
                        )}
                        Sign Up
                      </Link>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <Link
                        href="/auth/sign-in"
                        className={`${
                          active ? 'bg-violet-500 text-white' : 'text-gray-900'
                        } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                      >
                        {active ? (
                          <ArrowLeftOnRectangleIconSolid
                            className="mr-2 h-5 w-5"
                            aria-hidden="true"
                          />
                        ) : (
                          <ArrowLeftOnRectangleIconOutline
                            className="mr-2 h-5 w-5"
                            aria-hidden="true"
                          />
                        )}
                        Sign In
                      </Link>
                    )}
                  </Menu.Item>
                </>
              )}
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
}
