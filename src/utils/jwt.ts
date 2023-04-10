import jwt from 'jsonwebtoken';

export const signToken = (_id: string, username: string) => {
  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET Required, check environment configuration');
  }
  return jwt.sign(
    { _id, username }, //Payload
    process.env.JWT_SECRET,
    { expiresIn: '30d' }
  );
}

export const verifyToken = (token: string): Promise<string> => {
  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET Required, check environment configuration');
  }

  return new Promise((resolve, reject) => {
    try {
      jwt.verify(token, process.env.JWT_SECRET || '', (err, payload) => {
        if (err) return reject('jwt invalid');

        const { _id } = payload as { _id: string };
        resolve(_id);
      });
    } catch (error) {
      reject('jwt invalid');
    }
  });
}