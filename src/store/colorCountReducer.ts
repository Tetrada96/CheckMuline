import { createSlice } from '@reduxjs/toolkit';

import { objectColor } from './object';

export const counterSlice = createSlice({
  name: 'counter',
  initialState: [{ id: '1', color: '', nameColorEnd: '', DMC: '', nameColorRu: '', count: 0 }],
  reducers: {
    addInfo: () => {
      return objectColor;
    },
    changeCount: (state, action) => {
      const newState = state.map((item) =>
        item.id === action.payload.id ? (item.count = action.payload.value) : item
      );
      state = newState;
    },
  },
});

// Action creators are generated for each case reducer function
export const { changeCount, addInfo } = counterSlice.actions;

export default counterSlice.reducer;
