import { RootState } from 'store';

export const selectSearch = (state: RootState) => state.controls.search;
export const selectControls = (state: RootState) => state.controls;