import { useEffect, useState, MouseEvent } from 'react';
import Image from 'next/image';
import { GoVerified } from 'react-icons/go';
import axios from 'axios';

import VideoCard from '../../components/VideoCard';
import NoResults from '../../components/NoResults';
import { User, Video } from '../../types';
import { BASE_URL } from '../../utils';
import { NextPage } from 'next';
import Link from 'next/link';

type Props = {
  data: {
    user: User;
    createdPosts: Video[];
    likedPosts: Video[];
  };
};

const Profile: NextPage<Props> = ({ data }) => {
  const { user, createdPosts, likedPosts } = data;

  const [showCreatedPosts, setShowCreatedPosts] = useState(true);
  const [videosList, setVideosList] = useState<Video[]>([]);

  const videoTxtStyle = showCreatedPosts ? ' border-b-2 border-black' : ' text-gray-400';
  const likedTxtStyle = !showCreatedPosts ? ' border-b-2 border-black' : ' text-gray-400';

  useEffect(() => {
    setVideosList(showCreatedPosts ? createdPosts : likedPosts);
  }, [showCreatedPosts, createdPosts, likedPosts]);

  return (
    <div className=' w-full'>
      {/* avator and names */}
      <div className=' flex gap-6 md:gap-10 mb-4 bg-white w-full'>
        <div className=' w-16 h-16 relative md:w-32 md:h-32'>
          <Image src={user.image} fill alt='user profile' className=' rounded-full'></Image>
        </div>

        <div className='flex flex-col justify-center'>
          <p className='flex gap-1 items-center md:text-2xl tracking-wider text-base font-bold text-primary lowercase'>
            {user.userName.replace(' ', '')}
            <GoVerified className=' text-blue-400' />
          </p>
          <p className=' capitalize md:text-xl text-gray-400 text-sm'>{user.userName}</p>
        </div>
      </div>

      <div>
        {/* videos and likes button */}
        <div className=' flex gap-10 border-b-2 border-gray-200 mb-10 mt-10 bg-white w-full'>
          <p
            className={`text-xl font-semibold cursor-pointer mt-2 ${videoTxtStyle}`}
            onClick={() => setShowCreatedPosts(true)}
          >
            Video
          </p>
          <p
            className={`text-xl font-semibold cursor-pointer mt-2 ${likedTxtStyle}`}
            onClick={() => setShowCreatedPosts(false)}
          >
            Likes
          </p>
        </div>

        {/* show video list */}
        <div className='flex gap-6 flex-wrap md:justify-start'>
          {videosList.length > 0 ? (
            videosList.map((video, idx) => <VideoCard key={idx} post={video} />)
          ) : (
            <NoResults text={`No ${showCreatedPosts ? '' : 'Liked'} Videos Yet`} />
          )}
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps = async ({
  params: { userId },
}: {
  params: { userId: string };
}) => {
  const { data } = await axios.get(`${BASE_URL}/api/profile/${userId}`);
  return {
    props: { data },
  };
};

export default Profile;
