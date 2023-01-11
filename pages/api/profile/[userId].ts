// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { client } from '../../../utils/client';
import {
  singleUserQuery,
  userCreatedPostsQuery,
  userLikedPostsQuery,
} from '../../../utils/queries';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const { userId } = req.query;
    const userQuery = singleUserQuery(userId as string);
    const createdPostsQuery = userCreatedPostsQuery(userId as string);
    const likedPostsQuery = userLikedPostsQuery(userId as string);

    const user = await client.fetch(userQuery);
    const createdPosts = await client.fetch(createdPostsQuery);
    const likedPosts = await client.fetch(likedPostsQuery);

    res.status(200).json({ user: user[0], createdPosts, likedPosts });
  }
}
