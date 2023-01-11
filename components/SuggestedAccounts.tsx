import React, { useEffect } from 'react';
import Image from 'next/image';
import { NextPage } from 'next';
import Link from 'next/link';
import { GoVerified } from 'react-icons/go';

import useAuthStore from '../store/authStore';
import type { User } from '../types';

const SuggestedAccounts = () => {
  const { fetchAllUsers, allUsers } = useAuthStore();

  useEffect(() => {
    fetchAllUsers();
  }, []);

  return (
    <div className='xl:border-b-2 border-gray-200 pb-4 hidden xl:block'>
      <p className=' text-gray-500 font-semibold m-3 mt-4 '>Suggested Accounts</p>
      <div>
        {allUsers.slice(0, 6).map((user) => (
          <Link key={user._id} href={`/profile/${user._id}`}>
            <div className='flex gap-3 hover:bg-primary p-2 cursor-pointer font-semibold rounded'>
              <div className=' w-8 h-8'>
                <Image
                  src={user.image}
                  width={34}
                  height={34}
                  alt=''
                  className=' rounded-full'
                ></Image>
              </div>

              <div className='hidden lg:block'>
                <p className='flex gap-1 items-center text-base font-bold text-primary lowercase'>
                  {user.userName.replace(' ', '')}
                  <GoVerified className=' text-blue-400' />
                </p>
                <p className=' capitalize text-gray-400 text-sm'>{user.userName}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SuggestedAccounts;
