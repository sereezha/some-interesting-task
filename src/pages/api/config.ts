// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import config from '@/api/config.json';
import { IApiConfigData } from '@/types';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<IApiConfigData>
) {
  res.status(200).json(config);
}
