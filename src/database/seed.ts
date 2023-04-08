import bcrypt from 'bcryptjs';

interface SeedUser {
  username: string;
  email: string;
  password?: string;
  provider: 'F-Code' | 'GitHub' | 'Gmail';
  picture: string;
  score?: number;
  role: 'user' | 'admin';
  active?: boolean;
}

interface SeedData {
  users: SeedUser[];
}

export const seedData: SeedData = {
  users: [
    {
      username: 'MiguelHP24',
      email: 'miguelo@mail.com',
      password: bcrypt.hashSync('123456'),
      provider: 'F-Code',
      picture: '@',
      role: 'admin'
    },
    {
      username: 'JuanAlca',
      email: 'juan@mail.com',
      password: bcrypt.hashSync('123456'),
      provider: 'F-Code',
      picture: '@',
      role: 'user'
    },
  ]
}