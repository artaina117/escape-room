import { NameSpace } from '../../const';
import { BookingQuest } from '../../types/booking-quest';
import { State } from '../../types/state';

export const getBookingQuest = (state: State): BookingQuest => state[NameSpace.Booking].bookingQuest;
