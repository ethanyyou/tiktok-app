// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { v4 } from 'uuid';
import { client } from '../../../utils/client';
import { postDetailQuery } from '../../../utils/queries';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const { id } = req.query;
    if (!id) return;
    const query = postDetailQuery(id);
    const data = await client.fetch(query);
    return res.status(200).json(data[0]);
  }

  if (req.method === 'PUT') {
    const { comment, userId } = req.body;
    const { id } = req.query;

    const data = await client
      .patch(id as string)
      .setIfMissing({ comments: [] })
      .insert('after', 'comments[-1]', [
        {
          comment,
          _key: v4(),
          postedBy: { _type: 'postedBy', _ref: userId },
        },
      ])
      .commit();
    return res.status(200).json(data);
  }
}
