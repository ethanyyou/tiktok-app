import { BsGithub, BsLinkedin } from 'react-icons/bs';
import { FaAddressCard } from 'react-icons/fa';
import { footerList1, footerList2, footerList3 } from '../utils/constants';
import MyInfoCard from './MyInfoCard';

const Infos = [
  {
    title: 'About TikTik',
    contents: [
      "TikTik is a Tiktok-like video sharing platform at which you can log in to post, comment and like videos. It is made by React, Next JS with the latest Zustand as the stage management tool. The backend is powered by Sanity. Google's OAuth has also been intergrated for you to log in. All of the code is written in TypeScript. The webpage is responsive and compatible with mobile devices. Enjoy and have fun here at TikTik!",
    ],
  },
  {
    title: 'About Me',
    contents: [
      "I'm Yixuan Yu, a Computer Science student at USC seeking for a front-end job. I have a good command of HTML, CSS, JavaScript and TypeScript. And I'm able to use front-end frameworks like React and its ecosystems to build websites and apps. I would be appreciate if you have any available job opportunities. ",
    ],
  },
  {
    title: 'Contact',
    contents: [
      'Address: 1178 W 24TH ST, Los Angeles, CA 90007',
      'Phone: (213)400-2279',
      'Email: easianyu@gmail.com',
    ],
  },
];

const List = ({ listItems, mt }: { listItems: string[]; mt: boolean }) => (
  <div className={`flex flex-wrap gap-2 ${mt && 'mt-5'}`}>
    {listItems.map((item) => (
      <p key={item} className=' text-gray-400 text-sm hover:underline cursor-pointer'>
        {item}
      </p>
    ))}
  </div>
);

const Footer = () => {
  return (
    <div className=' mt-6 hidden xl:block'>
      {/* <div className=' mt-6 hidden xl:block'>
        <List listItems={footerList1} mt={false} />
        <List listItems={footerList2} mt />
        <List listItems={footerList3} mt />
        <p className=' text-gray-400 mt-5 text-sm'>2023 TikTik</p>
      </div> */}

      <div className=' flex flex-col gap-4 mt-6'>
        {Infos.map((info) => (
          <MyInfoCard key={info.title} info={info} />
        ))}
      </div>

      <div className='flex gap-5 justify-around w-[200px] mt-8 text-4xl text-gray-600'>
        <a href='https://github.com/easianyu/tiktok-app'>
          <BsGithub />
        </a>
        <a href='#'>
          <FaAddressCard />
        </a>
        <a href='https://www.linkedin.com/in/easian-yu/'>
          <BsLinkedin />
        </a>
      </div>
    </div>
  );
};

export default Footer;
