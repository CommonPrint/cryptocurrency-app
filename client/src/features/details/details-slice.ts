import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { CryptoToken, Extra, Status } from 'types';

export const loadCryptoCoinByName = createAsyncThunk<
  { data: CryptoToken[] },
  string,
  { extra: Extra }
>(
  '@@details/load-country-by-name',
  (name, {extra: {client, api}}) => {
    return client.get(api.searchByCoin(name));
  }
);

type DetailsSlice = {
  currentCryptoCoin: CryptoToken | null,
  // currentCryptoCoin: {data: { data: CryptoToken} } | any | null,
  status: Status,
  error: string | null,
}

const initialState: DetailsSlice = {
  currentCryptoCoin: null,
  status: 'idle',
  error: null,
}

const detailsSlice = createSlice({
  name: '@@details',
  initialState,
  reducers: {
    clearDetails: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadCryptoCoinByName.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(loadCryptoCoinByName.rejected, (state) => {
        state.status = 'rejected';
        state.error = 'Can not load data';
      })
      .addCase(loadCryptoCoinByName.fulfilled, (state, action) => {
        state.status = 'idle';
        // state.currentCryptoCoin = action.payload.data[0];
        state.currentCryptoCoin = Object.values(action.payload.data)[0]
      })
  }
});

export const {clearDetails} = detailsSlice.actions;
export const detailsReducer = detailsSlice.reducer;
