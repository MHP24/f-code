export interface ISolve {
  _id?: string;
  code: string;
  solved: boolean;
  attempts: number;
  userId: string;
  challengeId: string;
}