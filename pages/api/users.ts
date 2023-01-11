// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { allUsersQuery } from '../../utils/queries';

import { client } from '../../utils/client';

type Data = {
  name: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const data = await client.fetch(allUsersQuery());
    if (!data) res.json([]);
    res.status(200).json(data);
  }
}
