import { useState, useEffect, FormEvent } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { GoogleLogin, googleLogout } from '@react-oauth/google';

import { AiOutlineLogout } from 'react-icons/ai';
import { BiSearch } from 'react-icons/bi';
import { IoMdAdd } from 'react-icons/io';
import useAuthStore from '../store/authStore';
import Logo from '/titik-logo.png';
import { createOrGetUser } from '../utils';
const Navbar = () => {
  const { userProfile, addUser, removeUser } = useAuthStore();
  const [searchValue, setSearchValue] = useState('');
  const router = useRouter();

  const searchHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!searchValue) return;
    router.push(`/search/${searchValue}`);
  };

  return (
    <div className='w-full flex justify-between items-center border-b-2 border-gray-200 py-2 px-4'>
      <Link href='/'>
        <div className='relative w-[100px] md:w-[130px] md:h-[40px] h-[30px]'>
          <Image className='cursor-pointer' src='/tiktik-logo.png' alt='Tiktik' fill />
        </div>
      </Link>

      <div className=' relative hidden md:block'>
        <form
          action=''
          onSubmit={searchHandler}
          className='absolute md:static top-10 -left-20 bg-white'
        >
          <input
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className='bg-primary p-3 md:text-md font-medium border-2 border-gray-100 focus:outline-none focus:border-2 focus:border-gray-300 w-[300px] md:w-[350px] rounded-full  md:top-0'
            placeholder='Search accounts and videos'
          />
          <button
            type='submit'
            className='absolute md:right-5 right-6 top-4 border-l-2 border-gray-300 pl-4 text-2xl text-gray-400'
          >
            <BiSearch />
          </button>
        </form>
      </div>

      <div>
        {userProfile ? (
          // <div className=' flex gap-5 md:gap-10'>
          <div className='flex items-center gap-4 md:gap-10'>
            <Link href={`/upload`}>
              <button className='flex items-center border-2 p-2 md:px-4 text-base font-semibold gap-2'>
                <IoMdAdd className=' text-xl' />
                {` `}
                <span className='hidden md:block'>Upload</span>
              </button>
            </Link>
            {userProfile.image && (
              <Link href={`/`}>
                <Image
                  className=' rounded-full'
                  width={40}
                  height={40}
                  src={userProfile.image}
                  alt='profile photo'
                />
              </Link>
            )}

            <button
              className=' text-red-700 text-2xl'
              onClick={() => {
                googleLogout();
                removeUser();
              }}
            >
              <AiOutlineLogout />
            </button>
          </div>
        ) : (
          <GoogleLogin
            onSuccess={(response) => createOrGetUser(response, addUser)}
            onError={() => console.log('Error')}
          />
        )}
      </div>
    </div>
  );
};
export default Navbar;
