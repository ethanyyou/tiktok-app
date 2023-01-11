import axios from 'axios';
import NoResults from '../components/NoResults';
import VideoCard from '../components/VideoCard';

import type { Video } from '../types';
import { BASE_URL } from '../utils';

interface IProps {
  videos: Video[];
}

const Home = ({ videos }: IProps) => {
  return (
    <div className='flex flex-col gap-10 videos h-full'>
      {videos.length ? (
        videos.map((video: Video) => <VideoCard key={video._id} post={video} />)
      ) : (
        <NoResults text={'No Videos'} />
      )}
    </div>
  );
};

export const getServerSideProps = async ({ query: { topic } }: { query: { topic: string } }) => {
  const { data } = topic
    ? await axios.get(`${BASE_URL}/api/discover/${topic}`)
    : await axios.get(`${BASE_URL}/api/post/`);

  return {
    props: { videos: data },
  };
};

export default Home;
