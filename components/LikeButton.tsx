import { useEffect, useState } from 'react';
import { MdFavorite } from 'react-icons/md';
import { NextPage } from 'next';

import useAuthStore from '../store/authStore';

type IProps = {
  handleLike: () => void;
  handleDislike: () => void;
  likes: any[];
};

const LikeButton: NextPage<IProps> = ({ likes, handleLike, handleDislike }) => {
  const [alreadyLiked, setAlreadyLiked] = useState(false);
  const { userProfile } = useAuthStore();

  const filterLikes = likes?.filter((likedUser) => likedUser._ref === userProfile?._id);

  useEffect(() => {
    if (filterLikes?.length > 0) {
      setAlreadyLiked(true);
    } else {
      setAlreadyLiked(false);
    }
  }, [likes, filterLikes]);

  return (
    <div className='flex'>
      <div className='flex flex-col items-center gap-1'>
        {alreadyLiked ? (
          <div
            onClick={handleDislike}
            className='bg-primary p-2 rounded-full md:p-4 text-[#F51997] cursor-pointer'
          >
            <MdFavorite />
          </div>
        ) : (
          <div onClick={handleLike} className='bg-primary p-2 rounded-full md:p-4 cursor-pointer'>
            <MdFavorite className=' ' />
          </div>
        )}
        <p className=' font-semibold'>{likes ? likes.length : 0}</p>
      </div>
    </div>
  );
};

export default LikeButton;
