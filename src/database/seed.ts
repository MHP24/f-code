import bcrypt from 'bcryptjs';

interface SeedUser {
  username: string;
  email: string;
  password?: string;
  role: 'user' | 'admin';
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
      role: 'admin'
    },
    {
      username: 'JuanAlca',
      email: 'juan@mail.com',
      password: bcrypt.hashSync('123456'),
      role: 'user'
    },
  ]
}