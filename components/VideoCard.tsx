import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { HiVolumeUp, HiVolumeOff } from 'react-icons/hi';
import { BsPlay, BsFillPlayFill, BsFillPauseFill } from 'react-icons/bs';
import { GoVerified } from 'react-icons/go';
import type { NextPage } from 'next';
import type { Video } from '../types';

type IProps = {
  post: Video;
};

const VideoCard: NextPage<IProps> = ({ post }) => {
  return (
    <div>
      <div>
        <div>
          <div>
            <Link href='#'>
              <>
                <Image width={62} height={62} src={post.postedBy.image} alt='profile photo' />
              </>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
