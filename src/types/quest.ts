import { QuestLevels, QuestThemes } from '../const';

export type Quest = {
  id: number;
  title: string;
  previewImg: string;
  previewImgWebp: string;
  level: QuestLevels;
  type: QuestThemes;
  peopleMinMax: [number, number];
};
