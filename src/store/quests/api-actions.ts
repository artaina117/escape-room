import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { APIRoute } from '../../const';
import { Quest } from '../../types/quest';
import { CurrentQuest } from '../../types/current-quest';
import { AppDispatch, State } from '../../types/state';

export const fetchQuestsAction = createAsyncThunk<Quest[], undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchQuests',
  async (_arg, { extra: api }) => {
    const { data } = await api.get<Quest[]>(APIRoute.Quests);
    return data;
  },
);

export const fetchCurrentQuestAction = createAsyncThunk<CurrentQuest | null, number, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchCurrentOffer',
  async (id, { dispatch, extra: api }) => {
    try {
      const { data } = await api.get<CurrentQuest>(`${APIRoute.Quests}/${id}`);
      return data;
    } catch {
      // dispatch(redirectToRoute(AppRoute.NotFound));
      return null;
    }
  },
);
