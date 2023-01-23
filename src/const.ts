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

export enum QuestTypes {
  Adventures = 'adventures',
  Horror = 'horror',
  Mystic = 'mystic',
  Detective = 'detective',
  SciFi = 'sci-fi',
}

export enum APIRoute {
  Quests = '/escape-room/quest',
}
