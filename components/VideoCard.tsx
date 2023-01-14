import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { HiVolumeUp, HiVolumeOff } from 'react-icons/hi';
import { BsPlay, BsFillPlayFill, BsFillPauseFill } from 'react-icons/bs';
import { GoVerified } from 'react-icons/go';
import type { NextPage } from 'next';
import { Video } from '../types';
import Discover from './Discover';
import VideoButton, { VIDEO_BUTTON_TYPE } from './VideoButton';

type IProps = {
  post: Video;
};

const VideoCard: NextPage<IProps> = ({ post }) => {
  const [isHover, setIsHover] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [isVideoMuted, setIsVideoMuted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = isVideoMuted;
    }
  }, [isVideoMuted]);

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
          <Link href={`/profile/${post.postedBy._id}`}>
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
          <Link href={`/profile/${post.postedBy._id}`}>
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
        className='w-[250px] md:w-[300px] lg:w-[400px] rounded-2xl overflow-hidden lg:ml-20 relative'
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
      >
        <Link href={`/detail/${post._id}`}>
          <div className='border-dashed border-4 rounded-xl border-gray-300 relative'>
            <video
              className=' w-full rounded-2xl'
              ref={videoRef}
              src={post.video.asset.url}
              playsInline
              muted
            ></video>
            <span className=' absolute left-11 top-[50%] font-semibold text-lg text-gray-400 -z-[1]'>
              Tap to Show Video
            </span>
          </div>
        </Link>
        {isHover && (
          <div className='flex justify-between w-full px-4 absolute bottom-3'>
            {playing ? (
              <VideoButton onButtonPress={onVideoPress} buttonType={VIDEO_BUTTON_TYPE.pause} />
            ) : (
              <VideoButton onButtonPress={onVideoPress} buttonType={VIDEO_BUTTON_TYPE.play} />
            )}
            {isVideoMuted ? (
              <VideoButton
                onButtonPress={() => setIsVideoMuted(false)}
                buttonType={VIDEO_BUTTON_TYPE.mute}
              />
            ) : (
              <VideoButton
                onButtonPress={() => setIsVideoMuted(true)}
                buttonType={VIDEO_BUTTON_TYPE.unmute}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoCard;
