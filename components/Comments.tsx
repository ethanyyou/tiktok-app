import { Dispatch, FC, SetStateAction, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { GoVerified } from 'react-icons/go';

import useAuthStore from '../store/authStore';
import NoResults from './NoResults';
import { User } from '../types';
import { NextComponentType } from 'next';

type IProps = {
  isPostingComment: Boolean;
  comment: string;
  setComment: Dispatch<SetStateAction<string>>;
  addComment: (e: React.FormEvent) => void;
  comments: Comment[];
};

type Comment = {
  comment: string;
  length?: number;
  _key: string;
  postedBy: { _ref?: string; _id?: string };
};

const Comments: FC<IProps> = ({ comment, setComment, isPostingComment, addComment, comments }) => {
  const { userProfile, allUsers } = useAuthStore();

  return (
    <div className=' pt-4 relative border-t-2 border-gray-200 bg-[#F8F8F8] border-b-2 lg:pb-0 pb-[100px]'>
      <div className=' lg:h-[475px] overflow-scroll px-5'>
        {comments?.length ? (
          <div>
            {comments.map((comment, idx) => (
              <>
                {allUsers.map(
                  (user) =>
                    user._id === (comment.postedBy._id || comment.postedBy._ref) && (
                      <div key={idx} className='p-2'>
                        <Link href={`/profile/${user._id}`} className='flex items-start gap-3'>
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
                        </Link>

                        <div>
                          <p>{comment.comment}</p>
                        </div>
                      </div>
                    )
                )}
              </>
            ))}
          </div>
        ) : (
          <NoResults text='No comments yet!' />
        )}
      </div>

      {userProfile && (
        <div className='absolute bottom-6 w-full px-5'>
          <form onSubmit={addComment} className=' flex gap-3'>
            <input
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className='bg-primary px-6 py-4 text-md font-medium border-2 w-[250px] md:w-[700px] lg:w-[350px] border-gray-100 focus:outline-none focus:border-2 focus:border-gray-300 flex-1 rounded-lg'
              placeholder='Add comment..'
            />
            <button className='text-md text-gray-400 ' onClick={addComment}>
              {isPostingComment ? 'Commenting...' : 'Comment'}
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Comments;
