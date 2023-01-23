import { store } from '../store';
import { Quest } from './quest';

export type QuestSlice = {
  quests: Quest[],
};

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
