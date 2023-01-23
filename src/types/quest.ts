import { QuestLevels, QuestTypes } from '../const';

export type Quest = {
  id: number;
  title: string;
  previewImg: string;
  previewImgWebp: string;
  level: QuestLevels;
  type: QuestTypes;
  peopleMinMax: [number, number];
};
