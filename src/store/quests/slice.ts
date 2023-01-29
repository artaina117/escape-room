import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { emptyCurrentQuest, DEFAULT_GENRE, DEFAULT_LEVEL, NameSpace } from '../../const';
import { QuestsSlice } from '../../types/state';
import { fetchCurrentQuestAction, fetchQuestsAction } from './api-actions';

const initialState: QuestsSlice = {
  quests: [],
  currentQuest: emptyCurrentQuest,
  activeGenreFilter: DEFAULT_GENRE,
  activeLevelFilter: DEFAULT_LEVEL,
  isQuestsDataLoading: false,
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
      .addCase(fetchQuestsAction.pending, (state) => {
        state.isQuestsDataLoading = true;
      })
      .addCase(fetchQuestsAction.fulfilled, (state, action) => {
        state.quests = action.payload;
        state.isQuestsDataLoading = false;
      })
      .addCase(fetchCurrentQuestAction.fulfilled, (state, action) => {
        if (action.payload) {
          state.currentQuest = action.payload;
        }
      });
  }
});

export const { changeActiveGenreFilter, changeActiveLevelFilter } = questsSlice.actions;
