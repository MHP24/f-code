import { db } from '.';
import { User } from '@/models';
import bcrypt from 'bcryptjs';
import { PaginateResult } from 'mongoose';
import { IUser, IUserActionReport } from '@/interfaces';
import { UserReport } from '@/models/UserReport';

export const checkBannedUser = async (email: string, provider: string) => {
  try {
    await db.connect();
    const user = await User.findOne({ email, provider: provider !== 'credentials' ? provider : 'f-code' });
    return user?.active ?? true;
  } catch (error) {
    console.error({ error });
    return false;
  } finally {
    await db.disconnect();
  }
}

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
      role,
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

    if (user) {
      if (!user.active) return null;
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

export const getUsers = async (search: string, page: number): Promise<PaginateResult<IUser> | []> => {
  try {
    await db.connect();
    const options = {
      page,
      limit: 2,
      select: `
        _id email username picture provider role active`,
    };

    const users = await User.paginate({
      username: (!search ? { $exists: true } : { $regex: search, $options: 'i' }),
    }, options);

    return users;
  } catch (error) {
    return [];
  } finally {
    await db.disconnect();
  }
}

export const getUsersReported = async (query: string, page: number): Promise<PaginateResult<IUserActionReport> | null> => {
  try {
    await db.connect();
    const options = {
      page,
      limit: 22,
      select: `_id picture username userId reporterId createdAt`,
      sort: { createdAt: 1 },
    };
    const users = await UserReport.paginate({
      username: (!query ? { $exists: true } : { $regex: query }),
      active: true
    }, options);
    return users;
  } catch (error) {
    console.error({ error });
    return null;
  } finally {
    await db.disconnect();
  }
}