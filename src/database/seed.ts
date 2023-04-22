import bcrypt from 'bcryptjs';

interface SeedUser {
  username: string;
  email: string;
  password?: string;
  picture: string;
  score?: number;
  role: 'user' | 'admin';
  active?: boolean;
}

interface SeedChallenge {
  slug: string;
  language: string;
  difficulty: number;
  instructions: string;
  functionName: string;
  parameters: string[];
  cases: {
    parameters: any[];
    expectedOutput: any;
  }[];
  tags: string[];
  active: boolean;
  creatorId: string;
}

interface SeedData {
  users: SeedUser[];
  challenges: SeedChallenge[];
}


export const seedData: SeedData = {
  users: [
    {
      username: 'MiguelHP24',
      email: 'miguelo@mail.com',
      password: bcrypt.hashSync('123456$ASD123asd'),
      picture: 'no-picture',
      role: 'admin'
    },
    {
      username: 'JuanAlca',
      email: 'juan@mail.com',
      password: bcrypt.hashSync('123456$ASD123asd'),
      picture: 'no-picture',
      role: 'user'
    },
  ],
  challenges: [
    {
      slug: 'the_best_sum',
      language: 'javascript',
      difficulty: 3,
      instructions: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent blandit volutpat mi in condimentum. Pellentesque ultricies est leo, quis dignissim nisl luctus vel. Fusce quam leo, venenatis ut nulla at, feugiat fringilla orci. Mauris ut risus odio. Nullam tempor cursus accumsan. Morbi consectetur sollicitudin elit, vitae dapibus sem suscipit sed. Maecenas massa eros, lobortis vel neque non, rhoncus pulvinar ante. Suspendisse vel efficitur metus.',
      functionName: 'sumNumbers',
      parameters: ['n1', 'n2'],
      cases: [
        {
          parameters: [1, 2],
          expectedOutput: 3
        },
        {
          parameters: [2, 6],
          expectedOutput: 8
        },
        {
          parameters: [3, -10],
          expectedOutput: -7
        }
      ],
      tags: ['tag1', 'tag2'],
      active: true,
      creatorId: '1232103132130198390'
    }
  ]
}