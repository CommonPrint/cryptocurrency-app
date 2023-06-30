import { RootState } from 'store';

export const selectCurrentCryptoCoin = (state: RootState) => state.details.currentCryptoCoin;
export const selectDetails = (state: RootState) => state.details;
