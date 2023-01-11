import { useState, useEffect, ChangeEvent } from 'react';
import { useRouter } from 'next/router';
import { FaCloudUploadAlt } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import axios from 'axios';
import type { SanityAssetDocument } from '@sanity/client';

import useAuthStore from '../store/authStore';
import { client } from '../utils/client';
import { topics } from '../utils/constants';
import { BASE_URL } from '../utils';

const fileTypesSet = new Set(['video/mp4', 'video/webm', 'video/ogg']);

const Upload = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [videoAsset, setVideoAsset] = useState<SanityAssetDocument>();
  const [wrongFileType, setWrongFileType] = useState(false);
  const [caption, setCaption] = useState('');
  const [category, setCategory] = useState(topics[0].name);
  const [savingPost, setSavingPost] = useState(false);
  const { userProfile } = useAuthStore();
  const router = useRouter();

  const uploadVideo = async (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;
    const selectedFile = event.target.files[0];
    if (!fileTypesSet.has(selectedFile.type)) {
      setIsLoading(false);
      setWrongFileType(true);
      return;
    }
    setIsLoading(true);
    setWrongFileType(false);
    const data = await client.assets.upload('file', selectedFile, {
      contentType: selectedFile.type,
      filename: selectedFile.name,
    });
    setVideoAsset(data);
    setIsLoading(false);
  };

  const postHandler = async () => {
    if (!videoAsset || !videoAsset._id || !caption || !category) return;
    setSavingPost(true);
    const document = {
      _type: 'post',
      caption,
      video: {
        _type: 'file',
        asset: {
          _type: 'reference',
          _ref: videoAsset?._id,
        },
      },
      userId: userProfile?._id,
      postedBy: {
        _type: 'postedBy',
        _ref: userProfile?._id,
      },
      topic: category,
    };

    const data = await axios.post(`${BASE_URL}/api/post`, document);
    router.push('/');
  };

  return (
    <div className=' flex w-full h-full absolute left-0 top-[60px] mb-10 pt-10 lg:pt-20 justify-center bg-[#F8F8F8]'>
      <div className=' w-[60%] xl:h-[80vh] bg-white'>
        <div className='flex flex-col  rounded-lg p-20 pt-40'>
          <div>
            <p className=' text-2xl font-bold'>Upload Video</p>
            <p className=' text-base text-gray-400 mt-1'>Post a video to your account</p>
          </div>
          <div className='flex mt-10 justify-between gap-6'>
            <div className=' flex flex-col justify-center w-[260px] h-[460px] border-dashed border-4 rounded-xl border-gray-200 cursor-pointer hover:border-red-300 hover:bg-gray-100 outline-none'>
              {isLoading ? (
                <p className='text-center text-3xl text-red-400 font-semibold'> Uploading </p>
              ) : (
                <div>
                  {videoAsset ? (
                    <div>
                      <video
                        src={videoAsset.url}
                        loop
                        controls
                        className=' rounded-xl h-[450px] bg-black'
                      ></video>
                    </div>
                  ) : (
                    <label>
                      <div className=' flex flex-col justify-center items-center w-full h-full'>
                        <div className=' flex flex-col items-center'>
                          <p>
                            <FaCloudUploadAlt className=' text-gray-300 text-6xl' />
                          </p>
                          <p className=' text-xl font-semibold'>Upload Video</p>
                        </div>
                        <p className=' text-sm leading-10 text-gray-400 text-center mt-5'>
                          MP4 or WebM or ogg <br />
                          720x1280 or higher <br />
                          Up to 10 minutes <br />
                          Less than 2GB
                        </p>
                        <p className=' bg-[#F51997] w-[90%] p-2 rounded text-white text-center outline-none font-medium mt-10 cursor-pointer'>
                          Select File
                        </p>
                      </div>
                      <input
                        type='file'
                        name='upload-video'
                        className=' w-0 h-0'
                        onChange={uploadVideo}
                      />
                    </label>
                  )}
                  {wrongFileType && (
                    <p className=' w-[250px] text-xl text-red-400 text-center mt-4 font-semibold'>
                      Please select a correct video file
                    </p>
                  )}
                </div>
              )}
            </div>

            <div className=' flex flex-col gap-3'>
              <label className=' font-medium'>Caption</label>
              <input
                type='text'
                value={caption}
                onChange={(event) => setCaption(event.target.value)}
                className=' bg-white bd outline-none rounded border-2 border-gray-200 p-2'
              />
              <label className=' font-medium'>Choose a Category</label>
              <select
                className='bg-white bd outline-none rounded border-2 border-gray-200 p-2 lg:p-4 p2 cursor-pointer'
                onChange={(event) => setCategory(event.target.value)}
              >
                {topics.map((topic) => (
                  <option
                    key={topic.name}
                    className=' outline-none capitalize bg-white text-gray-700 text-md p-2 hover:bg-slate-300'
                    value={topic.name}
                  >
                    {topic.name}
                  </option>
                ))}
              </select>
              <div className='flex gap-6 mt-10'>
                <button
                  className='w-28 lg:w-44 border-2 border-gray-300 rounded p-2 outline-none font-medium'
                  onClick={postHandler}
                  type='button'
                >
                  Discard
                </button>
                <button
                  className='w-28 lg:w-44 border-2 bg-[#F51997] text-white rounded p-2 outline-none font-medium '
                  onClick={postHandler}
                  type='button'
                >
                  Post
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Upload;
