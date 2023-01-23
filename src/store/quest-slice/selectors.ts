import { NameSpace } from '../../const';
import { Quest } from '../../types/quest';
import { State } from '../../types/state';

export const getQuests = (state: State): Quest[] => state[NameSpace.Quests].quests;
