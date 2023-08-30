import axios from 'axios';
import {configureStore} from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

import * as api from 'config';
import { themeReducer } from 'features/theme/theme-slice';
import { controlsReducer } from 'features/controls/controls-slice';
import { cryptocoinsReducer } from 'features/cryptocoins/cryptocoins-slice';
import { detailsReducer } from 'features/details/details-slice';

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    controls: controlsReducer,
    cryptocoins: cryptocoinsReducer,
    details: detailsReducer,
  },
  devTools: true,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    thunk: {
      extraArgument: {
        client: axios,
        api,
      },
    },
    serializableCheck: false,
  })
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
