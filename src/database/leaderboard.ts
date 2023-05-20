import { db } from '.';
import { Solve, User } from '@/models';
import { ILeaderboard, IRanking } from '@/interfaces';


export const getLeaderboard = async (limit: number): Promise<ILeaderboard[]> => {
  try {
    await db.connect();
    const leaderboard = await Solve.aggregate([
      {
        $group: {
          _id: '$userId',
          challenges: { $sum: 1 }
        }
      },
      {
        $lookup: {
          from: 'users',
          localField: '_id',
          foreignField: '_id',
          as: 'user',
          pipeline: [{
            $project: {
              username: 1,
              picture: 1,
              score: 1,
              challengesCreated: 1
            },
          }]
        }
      },
      {
        $match: {
          user: { $ne: [] }
        }
      },
      { $sort: { 'user.score': -1 } },
      { $limit: limit }
    ]);
    return leaderboard;
  } catch (error) {
    console.error({ error });
    return [];
  } finally {
    await db.disconnect();
  }
}


export const getRanking = async (id: string): Promise<IRanking | undefined> => {
  try {
    await db.connect();
    const userScore = await User.findById(id).select('score').lean();

    if (userScore) {
      const userRanking = await User.find({ score: { $gt: userScore.score } }).count();
      return {
        userScore: userScore.score,
        rank: userRanking + 1
      }
    }

  } catch (error) {
    console.error({ error });
    return {
      userScore: 0,
      rank: 0
    };
  } finally {
    await db.disconnect();
  }
}