import { User } from '@/models';
import { db } from '.';
import bcrypt from 'bcryptjs';

export const checkUser = async (email: string, password: string) => {
  try {
    await db.connect();
    const user = await User.findOne({ email });
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
    console.error(error);
    return null;
  } finally {
    await db.disconnect();
  }
}

export const oAuthenticate = async (email: string, username: string, picture: string, provider: string) => {
  try {
    await db.connect();
    const user = await User.findOne({ email, provider });
    console.log({ user });
    console.log({ provider });
    if (user) {
      //TODO: Validate change...
      await User.updateOne({ _id: user._id }, { picture, username }); //Update in case new picture or username from provider
      const { _id, role } = user;
      return {
        _id,
        username,
        email: email.toLocaleLowerCase(),
        picture,
        role
      };
    }

    const newUser = await new User({ email, username, picture, password: '_', provider }).save();
    const { _id, role } = newUser;

    return {
      _id,
      username,
      email: email.toLocaleLowerCase(),
      picture,
      role
    }

  } catch (error) {
    console.error({ error });
    return null;
  } finally {
    await db.disconnect();
  }
}