import { FC } from 'react';

export type FooterCardProps = {
  info: {
    title: string;
    contents: string[];
  };
};

const FooterCard: FC<FooterCardProps> = ({ info }) => {
  const { title, contents } = info;
  return (
    <div className='w-[300px]'>
      <h3 className=' font-bold text-gray-600 italic'>{title}</h3>
      {contents.map((content, idx) => (
        <p className=' text-gray-400' key={idx}>
          {content}
        </p>
      ))}
    </div>
  );
};

export default FooterCard;
