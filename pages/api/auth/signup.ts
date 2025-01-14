import { NextApiRequest, NextApiResponse } from 'next';
import { hashPassword } from '../../../lib/auth';
import { dbConnect } from '../../../lib/dbConnect';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { email, password, firstName, lastName } = req.body;

    if (!email || !password || !firstName || !lastName) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    try {
      const hashedPassword = await hashPassword(password);
      const db = await dbConnect();
      const collection = db.collection('users');

      const existingUser = await collection.findOne({ email });
      if (existingUser) {
        return res.status(409).json({ message: 'Email already exists' });
      }

      const result = await collection.insertOne({
        firstName,
        lastName,
        email,
        password: hashedPassword,
      });

      return res.status(201).json({ message: 'User created!', userId: result.insertedId });
    } catch (error) {
      console.error('Signup error:', error);
      return res.status(500).json({ message: 'Could not register user' });
    }
  }

  return res.status(405).json({ message: 'Method Not Allowed' });
}
