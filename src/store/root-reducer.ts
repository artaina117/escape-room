import { combineReducers } from '@reduxjs/toolkit';
import { NameSpace } from '../const';
import { questSlice } from './quest-slice/quest-slice';

export const rootReducer = combineReducers({
  [NameSpace.Quests]: questSlice.reducer,
});
