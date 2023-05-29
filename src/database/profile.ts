import { db, dbLeaderboard } from '@/database';
import { IProfileData } from '@/interfaces';
import { Solve, User } from '@/models';
import mongoose from 'mongoose';

interface IActivityDB {
  updatedAt: string;
  challengeId: {
    _id: string;
    slug: string;
    language: string;
    difficulty: number;
  }
}

export const getUserProfile = async (_id: string): Promise<IProfileData | null> => {
  try {
    await db.connect();
    const userId = new mongoose.Types.ObjectId(`${_id}`);
    const userData = await User.findById(_id).select('picture username -_id').lean();
    if(!userData) return null;
    const userRanking = await dbLeaderboard.getRanking(`${_id}`);

    const techCount = await Solve.aggregate([
      { $match: { userId } },
      {
        $lookup: {
          from: 'challenges',
          localField: 'challengeId',
          foreignField: '_id',
          as: 'challenge'
        }
      },
      { $unwind: '$challenge' },
      {
        $group: {
          _id: '$challenge.language',
          count: { $sum: 1 }
        }
      },
      {
        $facet: {
          javascript: [
            { $match: { _id: 'javascript' } },
            { $group: { _id: null, count: { $sum: '$count' } } }
          ],
          typescript: [
            { $match: { _id: 'typescript' } },
            { $group: { _id: null, count: { $sum: '$count' } } }
          ],
          python: [
            { $match: { _id: 'python' } },
            { $group: { _id: null, count: { $sum: '$count' } } }
          ]
        }
      },
      {
        $project: {
          _id: 0,
          javascript: { $ifNull: [{ $arrayElemAt: ['$javascript.count', 0] }, 0] },
          typescript: { $ifNull: [{ $arrayElemAt: ['$typescript.count', 0] }, 0] },
          python: { $ifNull: [{ $arrayElemAt: ['$python.count', 0] }, 0] }
        }
      }
    ]);


    const techs = Object.entries({ ...techCount[0] });
    const challengesCompleted = techs.reduce((acc, [_, score]) => {
      return acc += Number(score);
    }, 0);
    const techStats = {
      challengesCompleted,
      challengeDistribution: techs.map(([language, count]) => {
        return { language, percentage: (Number(count) * 100) / challengesCompleted }
      })
    };

    const recentActivity: IActivityDB[] = await Solve.find({ userId: _id }).limit(5)
      .select('updatedAt -_id')
      .sort({ updatedAt: -1 })
      .lean()
      .populate('challengeId', { slug: 1, language: 1, difficulty: 1 });

    const activity = recentActivity.map(({ updatedAt, challengeId }) => ({ updatedAt, challenge: challengeId }));

    return {
      profile: {
        id: _id,
        ...userData,
        technologies: techStats,
        ranking: userRanking!,
        recentActivity: activity
      }
    };

  } catch (error) {
    return null;

  } finally {

    await db.disconnect();
  }
}