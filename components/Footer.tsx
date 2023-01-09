import { footerList1, footerList2, footerList3 } from '../utils/constants';

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
      <List listItems={footerList1} mt={false} />
      <List listItems={footerList2} mt />
      <List listItems={footerList3} mt />
      <p className=' text-gray-400 mt-5 text-sm'>2023 TikTik</p>
    </div>
  );
};

export default Footer;
