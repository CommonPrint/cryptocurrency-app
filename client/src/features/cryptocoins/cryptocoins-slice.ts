import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { CryptoToken, Extra, Status } from 'types';

export const loadCryptoCoins = createAsyncThunk<
  { data: {data:  CryptoToken[] }}, 
  undefined,
  {
    state: { cryptocoins: CryptoCoinsSlice },
    extra: Extra,
    rejectValue: string,
  }
>(
  '@@cryptocoins/load-cryptocoins',
  async (_, {
    extra: {client, api},
    rejectWithValue,
  }) => {
    try {

      // Если данные есть в локальном хранилище, тогда не будем обращаться к серверу
      if(localStorage['crypto-list']) {
        return JSON.parse(localStorage['crypto-list'])
      }

      else {
        let data = await client.get(api.ALL_COINS)

        // Закэшируем данные в локальное хранилище
        localStorage.setItem('crypto-list', JSON.stringify(data));

        return data; 
      }

      // return client.get(api.ALL_COINS);

    } catch (error) {
      if (error instanceof Error)
        return rejectWithValue(error.message);
      return rejectWithValue('Unknown error');
    }
  },
  {
    condition: (_, { getState }) => {
      const { cryptocoins: { status } } = getState();

      if (status === 'loading') {
        return false;
      }
    }
  }
);

type CryptoCoinsSlice = {
  status: Status,
  error: string | null,
  list: {data: CryptoToken[]},
}

const initialState: CryptoCoinsSlice = {
  status: 'idle',
  error: null,
  list: {data: [] }
}

const cryptocoinsSlice = createSlice({
  name: '@@cryptocoins',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadCryptoCoins.pending, (state) => {
        state.status = 'loading';
        state.error = null;
        state.list.data = []
      })
      .addCase(loadCryptoCoins.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = action.payload || 'Cannot load data';
      })
      .addCase(loadCryptoCoins.fulfilled, (state, action) => {
        state.status = 'received';

        state.list = action.payload.data
      })
  }
})

console.log('State from cryptocoins-slice: ', cryptocoinsSlice.reducer);

export const cryptocoinsReducer = cryptocoinsSlice.reducer;
