import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { toast } from 'react-toastify';
import { APIRoute, AppRoute } from '../../const';
import { BookingQuest } from '../../types/booking-quest';
import { NewBooking } from '../../types/new-booking';
import { AppDispatch, State } from '../../types/state';
import { redirectToRoute } from '../action';

export const fetchBookingQuestAction = createAsyncThunk<BookingQuest | null, number, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchBookingQuest',
  async (id, { dispatch, extra: api }) => {
    try {
      const { data } = await api.get<BookingQuest>(`${APIRoute.Quests}/${id}${APIRoute.Booking}`);
      return data;
    } catch {
      dispatch(redirectToRoute(AppRoute.NotFound));
      return null;
    }
  },
);

export const postNewBookingAction = createAsyncThunk<void | null, NewBooking, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/postBooking',
  async ({ date, time, contactPerson, phone, withChildren, peopleCount, locationId, questId }, { dispatch, extra: api }) => {
    try {
      await api.post<NewBooking>(`${APIRoute.Quests}/${String(questId)}${APIRoute.Booking}`, { date, time, contactPerson, phone, withChildren, peopleCount, locationId, questId });
      dispatch(redirectToRoute(AppRoute.PersonalBooking));
    } catch {
      toast.error('Не удалось забронировать квест.');
      return null;
    }
  },
);
