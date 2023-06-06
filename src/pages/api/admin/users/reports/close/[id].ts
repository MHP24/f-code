import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import { db } from '@/database';
import { ISession } from '@/interfaces';
import { emailMsgs } from '@/mocks';
import { User } from '@/models';
import { UserReport } from '@/models/UserReport';
import nodemailer from 'nodemailer';

type Data = {
  error: string
} | { userId: string };

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  switch (req.method) {
    case 'POST':
      return closeReport(req, res);
    default:
      return res.status(400).json({ error: 'Bad request' });
  }
}

const closeReport = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  try {

    const { id } = req.query;
    const { ban } = req.body;

    if (typeof ban !== 'boolean') return res.status(400).json({ error: 'Ban status is required' });

    const session = await getSession({ req });
    if (!session) return res.status(401).json({ error: 'Unauthorized action' });
    const { user: userSession } = session as ISession;
    if (userSession.role !== 'admin') return res.status(401).json({ error: 'Unauthorized action' });
    await db.connect();

    const hasReport = (await UserReport.find({ userId: id, active: true })).length > 0;
    if (!hasReport) return res.status(400).json({ error: 'This user does not have reports' });


    await UserReport.updateMany({ userId: id, active: true }, { active: false, staffId: userSession._id });


    if (ban) {
      const user = await User.findByIdAndUpdate(id, { active: false });
      if (!user) return res.status(400).json({ error: 'Invalid user' });
      const { email, username } = user;
      const emailFormatted = email.replace('@fcode', '').toLowerCase();

      const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: Number(process.env.EMAIL_PORT),
        secure: false,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASSWORD
        }
      });

      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: emailFormatted,
        subject: '[FCode - Action] Account suspended',
        text: emailMsgs.suspendAccount(username)
      };
      await transporter.sendMail(mailOptions);
    }

    res.status(200).json({ userId: `${id}` });
  } catch (error) {
    console.error({ error });
    return res.status(400).json({ error: 'Unexpected error' });
  } finally {
    await db.disconnect();
  }
}