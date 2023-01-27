import { Genre } from './types/genre';

export const DEFAULT_GENRE = 'all';
export const DEFAULT_LEVEL = 'any';

export const VIEW_ZOOM = 17;
export const URL_MARKER_DEFAULT = '/img/svg/pin-default.svg';
export const URL_MARKER_CURRENT = '/img/svg/pin-active.svg';

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export enum AppRoute {
  Root = '/',
  Login = '/login',
  Booking = '/booking',
  PersonalBooking = '/reservation',
  Quest = '/quest',
  Contacts = '/contacts',
  NotFound = '*',
}

export enum NameSpace {
  Quests = 'QUESTS',
  User = 'USER',
}

export enum QuestLevels {
  Easy = 'easy',
  Medium = 'medium',
  Hard = 'hard',
}

export enum QuestThemes {
  Adventures = 'adventures',
  Horror = 'horror',
  Mystic = 'mystic',
  Detective = 'detective',
  SciFi = 'sci-fi',
}

export enum APIRoute {
  Quests = '/escape-room/quest',
  Login = '/escape-room/login',
  Logout = '/escape-room/logout',
}

export const questLevelAdapter = {
  hard: 'сложный',
  medium: 'средний',
  easy: 'лёгкий',
};

export const questTypeAdapter = {
  adventures: 'Приключения',
  horror: 'Ужасы',
  mystic: 'Мистика',
  detective: 'Детектив',
  'sci-fi': 'Sci-fi',
};

export const filterByGenres: Record<string, Genre> = {
  all: {
    text: 'Все квесты',
    icon: {
      name: '#icon-all-quests',
      width: 26,
      height: 30,
    },
  },
  adventures: {
    text: 'Приключения',
    icon: {
      name: '#icon-adventure',
      width: 36,
      height: 30,
    },
  },
  horror: {
    text: 'Ужасы',
    icon: {
      name: '#icon-horror',
      width: 30,
      height: 30,
    },
  },
  mystic: {
    text: 'Мистика',
    icon: {
      name: '#icon-mystic',
      width: 30,
      height: 30,
    },
  },
  detective: {
    text: 'Детектив',
    icon: {
      name: '#icon-detective',
      width: 40,
      height: 30,
    },
  },
  'sci-fi': {
    text: 'Sci-fi',
    icon: {
      name: '#icon-sci-fi',
      width: 28,
      height: 30,
    },
  },
};

export const filterByDifficulty: Record<string, { text: string }> = {
  any: {
    text: 'Любой',
  },
  easy: {
    text: 'Лёгкий',
  },
  medium: {
    text: 'Средний',
  },
  hard: {
    text: 'Сложный',
  },
};

export const currentQuest = {
  id: 0,
  title: '',
  previewImg: '',
  previewImgWebp: '',
  level: QuestLevels.Easy,
  type: QuestThemes.Adventures,
  peopleMinMax: [0, 0],
  description: '',
  coverImg: '',
  coverImgWebp: '',
};
