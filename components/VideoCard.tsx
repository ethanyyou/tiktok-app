import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { HiVolumeUp, HiVolumeOff } from 'react-icons/hi';
import { BsPlay, BsFillPlayFill, BsFillPauseFill } from 'react-icons/bs';
import { GoVerified } from 'react-icons/go';
import type { NextPage } from 'next';
import type { Video } from '../types';
import Discover from './Discover';

type IProps = {
  post: Video;
};

const VideoCard: NextPage<IProps> = ({ post }) => {
  const [isHover, setIsHover] = useState(true);
  const [playing, setPlaying] = useState(false);
  const [isVideoMuted, setIsVideoMuted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const onVideoPress = () => {
    if (playing) {
      videoRef?.current?.pause();
      setPlaying(false);
    } else {
      videoRef?.current?.play();
      setPlaying(true);
    }
  };

  return (
    <div className='flex flex-col border-b-2 border-gray-200 pb-6'>
      <div className='flex gap-3 p-2 cursor-pointer font-semibold rounded'>
        <div className='md:w-16 md:h-16 w-10 h-10'>
          <Link href='#'>
            <>
              <Image
                width={62}
                height={62}
                src={post.postedBy.image}
                alt='profile photo'
                className=' rounded-full'
              />
            </>
          </Link>
        </div>
        <div>
          <Link href='#'>
            <div className=' flex gap-2 items-center'>
              <p className=' flex gap-2 items-center md:text-base font-bold text-primary'>
                {post.postedBy.userName}
                {` `}
                <GoVerified className=' text-blue-400 text-base' />
              </p>
              <p className=' capitalize font-medium text-xs text-gray-500 hidden md:block'>
                {post.postedBy.userName}
              </p>
            </div>
          </Link>
        </div>
      </div>

      <div
        className='w-[200px] md:w-[300px] lg:w-[400px] rounded-2xl overflow-hidden ml-20'
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
      >
        <Link href='#'>
          <video
            className=' w-full rounded-2xl'
            ref={videoRef}
            src={post.video.asset.url}
            loop
          ></video>
        </Link>
        {isHover && (
          <div className='flex justify-center gap-32 px-5 py-3'>
            {playing ? (
              <button onClick={onVideoPress}>
                <BsFillPauseFill className='text-black text-2xl lg:text-4xl' />
              </button>
            ) : (
              <button onClick={onVideoPress}>
                <BsFillPlayFill className='text-black text-2xl lg:text-4xl' />
              </button>
            )}
            {isVideoMuted ? (
              <button onClick={() => setIsVideoMuted(false)}>
                <HiVolumeOff className='text-black text-2xl lg:text-4xl' />
              </button>
            ) : (
              <button onClick={() => setIsVideoMuted(true)}>
                <HiVolumeUp className='text-black text-2xl lg:text-4xl' />
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoCard;
