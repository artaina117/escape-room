import { AuthorizationStatus } from '../const';
import { store } from '../store';
import { BookingQuest } from './booking-quest';
import { CurrentQuest } from './current-quest';
import { Quest } from './quest';

export type QuestsSlice = {
  quests: Quest[];
  currentQuest: CurrentQuest;
  activeGenreFilter: string;
  activeLevelFilter: string;
  isQuestsDataLoading: boolean;
};

export type UserSlice = {
  authorizationStatus: AuthorizationStatus;
  email: string;
};

export type BookingSlice = {
  bookingQuest: BookingQuest;
}

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
