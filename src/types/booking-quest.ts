import { Coords } from './coords';

export type BookingQuest = {
  id: number;
  locations: Location[];
  slots: {
    today: Slot[];
    tomorrow: Slot[];
  };
};

type Location = {
  id: number;
  address: string;
  coords: Coords;
};

type Slot = {
  time: string;
  isAvailable: boolean;
};
