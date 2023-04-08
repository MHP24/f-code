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