import { User } from '@/models';
import { db } from '.';
import bcrypt from 'bcryptjs';

export const checkUser = async (email: string, password: string) => {
  try {
    await db.connect();
    const user = await User.findOne({ email });
    await db.disconnect();
    if (!user || !bcrypt.compareSync(password, user.password!)) return null;

    const { _id, username, picture, role } = user;

    return {
      _id,
      username,
      email: email.toLocaleLowerCase(),
      picture,
      role
    };

  } catch (error) {
    await db.disconnect();
    console.error(error);
    return null;
  }
}

export const oAuthenticate = async (email: string, username: string, picture: string) => {
  try {
    await db.connect();
    const user = await User.findOne({ email });

    if (user) {
      //TODO: Validate change...
      await User.updateOne({ _id: user._id }, { picture, username }); //Update in case new picture or username from provider
      await db.disconnect();

      const { _id, role } = user;
      return {
        _id,
        username,
        email: email.toLocaleLowerCase(),
        picture,
        role
      };
    }

    const newUser = new User({ email, username, picture, password: '_' });
    await newUser.save();
    await db.disconnect();

    const { _id, role } = newUser;

    return {
      _id,
      username,
      email: email.toLocaleLowerCase(),
      picture,
      role
    }

  } catch (error) {
    await db.disconnect();
    console.error({ error });
    return null;
  }
}