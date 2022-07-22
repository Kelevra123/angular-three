export type workData = {
  title: string,
  date: string,
  img: string,
  role: string,
  technologies: string,
  achievements: Array<any>,
  challenge: Array<any>
}

export const workData: any = [
    {
      title: 'Practice with mentor, MashUpStudio',
      date: 'Feb 2020 — May 2020',
      img: '../../../assets/works/start.png',
      role: 'Trainee Front-end Developer;',
      technologies: 'React, JavaScript, Redux, HTML/CSS, Angular, Type Script;',
      challenge: [
        'created UI components for online stores and coworking ("Егорка", "Красная строка", "Aqua Polo");',
        'created form\'s and their validation;',
        'studied Angular and Type Script;',
        'created pet projects on React, Angular, taking video courses;'
      ],
      achievements: [
        'learned to read code, mastered patterns and architectural solutions;',
        'learned to work with git;',
        'gained basic skills in working with Angular;'
      ]
    },
    {
      title: 'SPA Aqua Polo, MashUpStudio',
      date: 'May 2020 — Jun 2020',
      img: '../../../assets/works/aqua.png',
      role: 'Front-end Developer;',
      technologies: 'Angular, Tailwind CSS, Type Script, RxJS;',
      challenge: [
        'layout according to the Figma template;',
        'mail bot implementation;',
        'implementation of a calculator for calculating the volume of a reservoir;'
      ],
      achievements: [
        'my first project from scratch;',
        'first interaction with server and mono-repository.',
      ],
    },
    {
      title: 'Art-Beer Telegram-bot, MashUpStudio',
      date: 'Jun 2020 — Sep 2020',
      img: '../../../assets/works/bot1.png',
      role: 'Full-stack Developer;',
      technologies: 'Angular, NestJs, TypeScript, RxJS, PostgreSQL, telegraf library;',
      challenge: [
        'created authorization with token storage, secure routes and the admin panel in general;',
        'deployed the server on NestJS according to the CRUD template;',
        'implemented proxy interaction between the admin bot (deliver the order to the manager) and the client bot (take the order from the client);',
        'worked on the loyalty system and it implementation in the bot;'
      ],
      achievements: [
        'gained experience with such patterns as: Factory, Command;',
        'first interaction with SQL.',
      ],
    },
    {
      title: 'Four more telegram bots, MashUpStudio',
      date: 'Sep 2020 — Jan 2021',
      img: '../../../assets/works/bot.png',
      role: 'Full-stack Developer;',
      technologies: 'Angular, NestJs, TypeScript, RxJS, PostgreSQL, telegraf library;',
      challenge: [
        'creating a bot according to a template, but with behavior changes depending on the customer\'s condition;',
      ],
      achievements: [
        'boosting the level of JavaScript and working with template tasks;',
      ],
    },
    {
      title: 'Skribble browser game for Wargaming, MashUpStudio',
      date: 'Jan 2021 — Feb 2021',
      img: '../../../assets/works/skribble.png',
      role: 'Full-stack Developer;',
      technologies: ' React, NestJs, TypeScript, Redux, Socket.io, perfect-freehand library;',
      challenge: [
        'implementation of an online chat that monitors player responses;',
        'drawing area implementation with svg vectors based on;',
        'perfect-freehand library;',
        'rendering vectors for each player with Redux;',
        'full implementation of the gameplay on sockets;'
      ],
      achievements: [
        'experience with React, Socket.io;',
        'interesting experience with asynchrony.'
      ],
    },
    {
      title: 'CRM for Coffee-shop, MashUpStudio',
      date: 'Feb 2021 — Feb 2022',
      img: '../../../assets/works/coffee.png',
      role: 'Full-stack Developer;',
      technologies: ' Angular, NestJs, TypeScript, RxJS, PostgreeSQL;',
      challenge: [
        'creating UI components;',
        'building work scenarios depending on the user;',
      ],
      achievements: [
        'experience in building complex interfaces;',
        'deeper understanding of OOP principles.'
      ],
    },
    {
      title: 'Mobile game Pocket Styler, NordCurrent',
      date: 'Feb 2022 — May 2022',
      img: '../../../assets/works/pocket.png',
      role: 'Middle game developer;',
      technologies: 'Cocos2dx, Docker;',
      challenge: [
        'fixing bugs and inaccuracies in the game logic;',
        'creating popup logic;',
        'сlient-server interaction;'
      ],
      achievements: [
        'experience with Cocos2dx;',
        'experience with large-scale games in JS'
      ]
    }
]
