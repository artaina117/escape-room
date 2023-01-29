import { createSlice } from '@reduxjs/toolkit';
import { emptyBookingQuest, NameSpace } from '../../const';
import { BookingSlice } from '../../types/state';
import { fetchBookingQuestAction } from './api-actions';

const initialState: BookingSlice = {
  bookingQuest: emptyBookingQuest,
};

export const bookingSlice = createSlice({
  name: NameSpace.Booking,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchBookingQuestAction.fulfilled, (state, action) => {
        if (action.payload) {
          state.bookingQuest = action.payload;
        }
      });
  }
});
