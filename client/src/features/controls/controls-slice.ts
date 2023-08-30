import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type ControlsSlice = {
  search: string,
}

const initialState: ControlsSlice = {
  search: '',
};

const controlsSlice = createSlice({
  name: '@@controls',
  initialState,
  reducers: {
    setSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
    },
    clearControls: () => initialState,
  }
});

export const {setSearch, clearControls} = controlsSlice.actions;
export const controlsReducer = controlsSlice.reducer;
