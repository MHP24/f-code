import { db } from '.';
import { ISearchCreatorRequest } from '@/interfaces';
import { CreatorRequest } from '@/models/CreatorRequest';
import { PaginateResult } from 'mongoose';

export const getApplicationns = async (query: string, page: number): Promise<PaginateResult<ISearchCreatorRequest> | []>  => {
  try {
    await db.connect();

    const options = {
      page,
      limit: 2,
      select: `_id subject createdAt`,
      populate: {
        path: 'userId',
        select: 'picture username'
      },
    };

    const applications = await CreatorRequest.paginate({
      closed: false,
      _id: (!query ? { $exists: true } : query),
    }, options);

    return applications;

  } catch (error) {
    return [];
  } finally {
    await db.disconnect();
  }
}