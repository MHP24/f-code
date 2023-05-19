export interface ICreatorHistory {
  _id: string;
  slug: string;
  language: string;
  status: number;
  reason: 'Create' | 'Update';
}