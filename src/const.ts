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
