import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { QuestSlice } from '../../types/state';
import { fetchQuestsAction } from '../api-actions';

const initialState: QuestSlice = {
  quests: [],
};

export const questSlice = createSlice({
  name: NameSpace.Quests,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchQuestsAction.fulfilled, (state, action) => {
        state.quests = action.payload;
      });
  }
});
