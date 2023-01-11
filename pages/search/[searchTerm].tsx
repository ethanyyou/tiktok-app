import axios from 'axios';
import { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import Image from 'next/image';

import NoResults from '../../components/NoResults';
import VideoCard from '../../components/VideoCard';
import useAuthStore from '../../store/authStore';
import { Video } from '../../types';
import { BASE_URL } from '../../utils';
import { GoVerified } from 'react-icons/go';

type Props = {
  videos: Video[];
};

const Search: NextPage<Props> = ({ videos }) => {
  const [showAccounts, setShowAccounts] = useState(false);
  const router = useRouter();
  const { searchTerm }: any = router.query;
  const { allUsers } = useAuthStore();

  const isAccounts = showAccounts ? ' border-b-2 border-black' : ' text-gray-400';
  const isVideos = !showAccounts ? ' border-b-2 border-black' : ' text-gray-400';

  const searchedAccounts = allUsers.filter(
    (user) => user.userName.toLowerCase() === searchTerm.toLowerCase()
  );
  console.log(searchTerm instanceof String);

  return (
    <div className=' w-full'>
      <div className=' flex gap-10 border-b-2 border-gray-200 mb-6 mt-10 bg-white w-full'>
        <p
          className={`text-xl font-semibold cursor-pointer mt-2 ${isAccounts}`}
          onClick={() => setShowAccounts(true)}
        >
          Accounts
        </p>
        <p
          className={`text-xl font-semibold cursor-pointer mt-2 ${isVideos}`}
          onClick={() => setShowAccounts(false)}
        >
          Videos
        </p>
      </div>

      {showAccounts ? (
        <div className=' '>
          {searchedAccounts.length > 0 ? (
            searchedAccounts.map((user, idx) => (
              <Link
                key={idx}
                href={`/profile/${user._id}`}
                className='flex items-center gap-3 p-2 cursor-pointer font-semibold rounded border-b-2 border-gray-200'
              >
                <div className=' w-16 h-16 relative'>
                  <Image src={user.image} fill alt='user profile' className=' rounded-full'></Image>
                </div>

                <div className='hidden lg:block'>
                  <p className='flex gap-1 items-center text-base font-bold text-primary lowercase'>
                    {user.userName.replace(' ', '')}
                    <GoVerified className=' text-blue-400' />
                  </p>
                  <p className=' capitalize text-gray-400 text-sm'>{user.userName}</p>
                </div>
              </Link>
            ))
          ) : (
            <NoResults text={`No Search Result for "${searchTerm}"`} />
          )}
        </div>
      ) : (
        <div className=' flex flex-wrap gap-6 md:justify-start'>
          {videos.length ? (
            videos.map((video, idx) => <VideoCard key={idx} post={video} />)
          ) : (
            <NoResults text={`No Search Result for "${searchTerm}"`} />
          )}
        </div>
      )}
    </div>
  );
};

export const getServerSideProps = async ({
  params: { searchTerm },
}: {
  params: { searchTerm: string };
}) => {
  const { data } = await axios.get(`${BASE_URL}/api/search/${searchTerm}`);
  return {
    props: { videos: data },
  };
};

export default Search;
