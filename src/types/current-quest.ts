import { QuestLevels, QuestThemes } from '../const';

export type CurrentQuest = {
  id: number;
  title: string;
  previewImg: string;
  previewImgWebp: string;
  level: QuestLevels;
  type: QuestThemes;
  peopleMinMax: number[];
  description: string;
  coverImg: string;
  coverImgWebp: string;
  }
