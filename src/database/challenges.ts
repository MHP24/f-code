import { db } from '@/database';
import { IChallengeSearch } from '@/interfaces';
import { Challenge } from '@/models';

export const getChallenges = async (language: string, slug: string): Promise<IChallengeSearch[] | null> => {
  try {
    await db.connect();
    const challenges = await Challenge
      .find({
        active: true,
        language: (!language ? { $exists: true } : language),
        slug: (!slug ? { $exists: true } : slug)
      })
      .lean().select(`
        _id slug language difficulty tags
        ${slug && language && 'instructions functionName cases parameters'}
      `);
    return challenges;
  } catch (error) {
    return null;
  } finally {
    await db.disconnect();
  }
}