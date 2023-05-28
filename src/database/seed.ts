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
    call: string;
    expectedOutput: any;
  }[];
  solution: string;
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
      email: 'miguelo@mail.com@fcode',
      password: bcrypt.hashSync('123456$ASD123asd'),
      picture: '/pictures/no-picture.png',
      role: 'admin'
    },
    {
      username: 'JuanAlca',
      email: 'juan@mail.com@fcode',
      password: bcrypt.hashSync('123456$ASD123asd'),
      picture: '/pictures/no-picture.png',
      role: 'user'
    },
  ],
  challenges: [
    {
      slug: 'the_best_sum',
      language: 'javascript',
      difficulty: 1,
      instructions: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent blandit volutpat mi in condimentum. Pellentesque ultricies est leo, quis dignissim nisl luctus vel. Fusce quam leo, venenatis ut nulla at, feugiat fringilla orci. Mauris ut risus odio. Nullam tempor cursus accumsan. Morbi consectetur sollicitudin elit, vitae dapibus sem suscipit sed. Maecenas massa eros, lobortis vel neque non, rhoncus pulvinar ante. Suspendisse vel efficitur metus.',
      functionName: 'sumNumbers',
      parameters: ['n1', 'n2'],
      cases: [
        {
          call: 'sumNumbers(1, 2)',
          expectedOutput: 3
        },
        {
          call: 'sumNumbers(2, 6)',
          expectedOutput: 8
        },
        {
          call: 'sumNumbers(3, -10)',
          expectedOutput: -7
        }
      ],
      solution: 'the best sum solution code',
      tags: ['tag1', 'tag2'],
      active: true,
      creatorId: '1232103132130198390'
    },
    {
      slug: 'check',
      language: 'javascript',
      difficulty: 2,
      instructions: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent blandit volutpat mi in condimentum. Pellentesque ultricies est leo, quis dignissim nisl luctus vel. Fusce quam leo, venenatis ut nulla at, feugiat fringilla orci. Mauris ut risus odio. Nullam tempor cursus accumsan. Morbi consectetur sollicitudin elit, vitae dapibus sem suscipit sed. Maecenas massa eros, lobortis vel neque non, rhoncus pulvinar ante. Suspendisse vel efficitur metus.',
      functionName: 'checkFn',
      parameters: ['n1', 'n2'],
      cases: [
        {
          call: `checkFn("asd", 1)`,
          expectedOutput: "asd1"
        },
        {
          call: "checkFn(2, '6')",
          expectedOutput: '26'
        },
        {
          call: 'checkFn(true, -10)',
          expectedOutput: -9
        },
        {
          call: 'checkFn("A", "b")',
          expectedOutput: `Ab`
        }
      ],
      solution: 'check solution code',
      tags: ['tag1', 'tag2'],
      active: true,
      creatorId: '1232103132130198390'
    },
    {
      slug: 'can_i_exit',
      language: 'javascript',
      difficulty: 4,
      instructions: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent blandit volutpat mi in condimentum. Pellentesque ultricies est leo, quis dignissim nisl luctus vel. Fusce quam leo, venenatis ut nulla at, feugiat fringilla orci. Mauris ut risus odio. Nullam tempor cursus accumsan. Morbi consectetur sollicitudin elit, vitae dapibus sem suscipit sed. Maecenas massa eros, lobortis vel neque non, rhoncus pulvinar ante. Suspendisse vel efficitur metus.',
      functionName: 'canExit',
      parameters: ['maze'],
      cases: [
        {
          call: `canExit([
            [' ', ' ', 'W', ' ', 'S'],
            [' ', ' ', ' ', ' ', ' '],
            [' ', ' ', ' ', 'W', ' '],
            ['W', 'W', ' ', 'W', 'W'],
            [' ', ' ', ' ', ' ', 'E']
          ])`,
          expectedOutput: true
        },
        {
          call: `canExit([
            [' ', ' ', 'W', 'W', 'S'],
            [' ', ' ', ' ', 'W', ' '],
            [' ', ' ', ' ', 'W', ' '],
            ['W', 'W', ' ', 'W', 'W'],
            [' ', ' ', ' ', ' ', 'E']
          ])`,
          expectedOutput: false
        },
        {
          call: `canExit([
            [' ', ' ', 'W', 'W', 'S'],
            [' ', ' ', ' ', 'W', ' '],
            [' ', ' ', ' ', 'W', ' '],
            ['W', 'W', ' ', ' ', 'W'],
            [' ', ' ', ' ', ' ', 'E']
          ])
          `,
          expectedOutput: false
        },
        {
          call: `canExit([
            ['E', ' ', ' ', ' ', 'S']
          ])
          `,
          expectedOutput: true
        },
        {
          call: `canExit([
            ['E', ' ', 'W', ' ', 'S']
          ])
          `,
          expectedOutput: false
        },
      ],
      solution: 'can i exit solution code',
      tags: ['tag1', 'tag2'],
      active: true,
      creatorId: '1232103132130198390'
    },
    {
      slug: 'optimize_gifts',
      language: 'javascript',
      difficulty: 4,
      instructions: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent blandit volutpat mi in condimentum. Pellentesque ultricies est leo, quis dignissim nisl luctus vel. Fusce quam leo, venenatis ut nulla at, feugiat fringilla orci. Mauris ut risus odio. Nullam tempor cursus accumsan. Morbi consectetur sollicitudin elit, vitae dapibus sem suscipit sed. Maecenas massa eros, lobortis vel neque non, rhoncus pulvinar ante. Suspendisse vel efficitur metus.',
      functionName: 'getMaxGifts',
      parameters: ['giftsCities', 'maxGifts', 'maxCities'],
      cases: [
        {
          call: `getMaxGifts([12, 3, 11, 5, 7], 20, 3)`,
          expectedOutput: 20
        },
        {
          call: `getMaxGifts([50], 15, 1)`,
          expectedOutput: 0
        },
        {
          call: `getMaxGifts([50], 100, 1)
          `,
          expectedOutput: 50
        },
        {
          call: `getMaxGifts([50, 70], 100, 1)

          `,
          expectedOutput: 70
        },
        {
          call: `getMaxGifts([50, 70, 30], 100, 2)
          `,
          expectedOutput: 100
        },
      ],
      solution: 'optimize gifts solution code',
      tags: ['tag1', 'tag2'],
      active: true,
      creatorId: '1232103132130198390'
    },
    {
      slug: 'the_hardest_array',
      language: 'typescript',
      difficulty: 4,
      instructions: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent blandit volutpat mi in condimentum. Pellentesque ultricies est leo, quis dignissim nisl luctus vel. Fusce quam leo, venenatis ut nulla at, feugiat fringilla orci. Mauris ut risus odio. Nullam tempor cursus accumsan. Morbi consectetur sollicitudin elit, vitae dapibus sem suscipit sed. Maecenas massa eros, lobortis vel neque non, rhoncus pulvinar ante. Suspendisse vel efficitur metus.',
      functionName: 'concatArraysByCount',
      parameters: ['arraySteps'],
      cases: [
        {
          call: 'concatArraysByCount(2)',
          expectedOutput: [2]
        },
        {
          call: 'concatArraysByCount(6)',
          expectedOutput: [2, 4, 6]
        },
        {
          call: 'concatArraysByCount(24)',
          expectedOutput: [2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24]
        }
      ],
      solution: 'the hardest array solution code',
      tags: ['tag1', 'tag2'],
      active: true,
      creatorId: '1232103132130198390'
    },
    {
      slug: 'fixing_the_calculator',
      language: 'python',
      difficulty: 3,
      instructions: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent blandit volutpat mi in condimentum. Pellentesque ultricies est leo, quis dignissim nisl luctus vel. Fusce quam leo, venenatis ut nulla at, feugiat fringilla orci. Mauris ut risus odio. Nullam tempor cursus accumsan. Morbi consectetur sollicitudin elit, vitae dapibus sem suscipit sed. Maecenas massa eros, lobortis vel neque non, rhoncus pulvinar ante. Suspendisse vel efficitur metus.',
      functionName: 'calibrate_calculator',
      parameters: ['n1', 'n2', 'operation'],
      cases: [
        {
          call: 'calibrate_calculator(2, 5, "sum")',
          expectedOutput: `{'output': 7}`
        },
        {
          call: 'calibrate_calculator(10, 5, "multiply")',
          expectedOutput: `{'output': 50}`
        },
        {
          call: 'calibrate_calculator(10, 5, "impossible operation")',
          expectedOutput: `{'output': "this operation does not exists"}`
        },
      ],
      solution: 'fixing the calculator solution code',
      tags: ['tag1', 'tag2'],
      active: true,
      creatorId: '1232103132130198390'
    }
  ]
}