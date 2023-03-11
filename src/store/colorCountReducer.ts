import { createSlice } from '@reduxjs/toolkit';

import { IColor, objectColor } from './object';

export const counterSlice = createSlice({
  name: 'counter',
  initialState: [{ id: '1', color: '', name_color_eng: '', dmc: '', name_color_ru: '', count: 0 }],
  reducers: {
    addInfo: () => {
      return objectColor;
    },
    changeCount: (state: IColor[], action: { payload: { id: string; value: number } }) => {
      const newState = state.map((item) =>
        item.id === action.payload.id ? { ...item, count: action.payload.value } : item
      );
      state = newState;
    },
  },
});

// Action creators are generated for each case reducer function
export const { changeCount, addInfo } = counterSlice.actions;

export default counterSlice.reducer;
