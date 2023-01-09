import { NextPage } from 'next';
type Iprops = {
  text: string;
};

const NoResults: NextPage<Iprops> = ({ text }) => {
  return <div>{text}</div>;
};

export default NoResults;
