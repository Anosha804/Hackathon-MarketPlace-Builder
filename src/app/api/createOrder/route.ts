import { NextApiRequest, NextApiResponse } from 'next';
import { client } from '@/sanity/lib/client';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const { user, items, totalAmount } = req.body;
      const orderId = `ORDER-${Date.now()}`;

      const order = {
        _type: 'order',
        orderId,
        user,
        items,
        totalAmount,
        status: 'Pending',
        createdAt: new Date().toISOString(),
      };

      const result = await client.create(order);
      return res.status(201).json({ success: true, order: result });
    } catch (error: any) {
        console.error("Sanity Order Creation Error:", error);
        return res.status(500).json({ success: false, error: error.message || 'Internal Server Error' });
      }
      
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
