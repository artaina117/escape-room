import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { currentQuest, DEFAULT_GENRE, DEFAULT_LEVEL, NameSpace } from '../../const';
import { QuestsSlice } from '../../types/state';
import { fetchCurrentQuestAction, fetchQuestsAction } from './api-actions';

const initialState: QuestsSlice = {
  quests: [],
  currentQuest: currentQuest,
  activeGenreFilter: DEFAULT_GENRE,
  activeLevelFilter: DEFAULT_LEVEL,
};

export const questsSlice = createSlice({
  name: NameSpace.Quests,
  initialState,
  reducers: {
    changeActiveGenreFilter: (state, action: PayloadAction<string>) => {
      state.activeGenreFilter = action.payload;
    },
    changeActiveLevelFilter: (state, action: PayloadAction<string>) => {
      state.activeLevelFilter = action.payload;
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchQuestsAction.fulfilled, (state, action) => {
        state.quests = action.payload;
      })
      .addCase(fetchCurrentQuestAction.fulfilled, (state, action) => {
        if (action.payload) {
          state.currentQuest = action.payload;
        }
      });
  }
});

export const { changeActiveGenreFilter, changeActiveLevelFilter } = questsSlice.actions;
