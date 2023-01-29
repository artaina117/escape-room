import { combineReducers } from '@reduxjs/toolkit';
import { NameSpace } from '../const';
import { bookingSlice } from './booking/slice';
import { questsSlice } from './quests/slice';
import { userSlice } from './user/slice';

export const rootReducer = combineReducers({
  [NameSpace.Quests]: questsSlice.reducer,
  [NameSpace.User]: userSlice.reducer,
  [NameSpace.Booking]: bookingSlice.reducer,
});
