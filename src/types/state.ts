import { store } from '../store';
import { CurrentQuest } from './current-quest';
import { Quest } from './quest';

export type QuestsSlice = {
  quests: Quest[],
  currentQuest: CurrentQuest,
  activeGenreFilter: string,
  activeLevelFilter: string,
};

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
