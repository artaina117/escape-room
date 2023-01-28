import { NameSpace } from '../../const';
import { CurrentQuest } from '../../types/current-quest';
import { Quest } from '../../types/quest';
import { State } from '../../types/state';


export const getQuests = (state: State): Quest[] => state[NameSpace.Quests].quests;
export const getQuestsGenreFilter = (state: State): string => state[NameSpace.Quests].activeGenreFilter;
export const getQuestsLevelFilter = (state: State): string => state[NameSpace.Quests].activeLevelFilter;
export const getCurrentQuest = (state: State): CurrentQuest => state[NameSpace.Quests].currentQuest;
export const getIsQuestsDataLoading = (state: State): boolean => state[NameSpace.Quests].isQuestsDataLoading;
