import { db } from '@/database';
import { IChallengeRequestSearch, IChallengeSearch } from '@/interfaces';
import { PaginateResult } from 'mongoose';
import { Challenge, ChallengeRequest } from '@/models';

export const getChallenges = async (language: string, slug: string, page: number): Promise<PaginateResult<IChallengeSearch> | []> => {
  try {
    await db.connect();
    const options = {
      page,
      limit: Number(process.env.SEARCH_PER_PAGE),
      select: `
        _id slug language difficulty tags
        ${slug && language && 'creatorId instructions functionName cases parameters solution'}
      `,
    };
    const challenges = await Challenge.paginate({
      active: true,
      language: (!language ? { $exists: true } : language),
      slug: (!slug ? { $exists: true } : { $regex: slug }),
    }, options);

    return challenges;
  } catch (error) {
    return [];
  } finally {
    await db.disconnect();
  }
}

export const getChallengeRequests = async (language: string, slug: string, page: number): Promise<PaginateResult<IChallengeRequestSearch> | null> => {
  try {
    await db.connect();

    const options = {
      page,
      limit: Number(process.env.SEARCH_PER_PAGE),
      select: `
        _id slug language difficulty reason createdAt
        ${slug && language && 'instructions functionName parametersCount parameters cases code tags creatorId'}
      `,
      sort: { createdAt: 1 },
    };

    const challenges = await ChallengeRequest.paginate({
      status: 1,
      language: (!language ? { $exists: true } : language),
      slug: (!slug ? { $exists: true } : { $regex: slug }),
    }, options);

    return challenges;
  } catch (error) {
    return null;
  } finally {
    await db.disconnect();
  }
}