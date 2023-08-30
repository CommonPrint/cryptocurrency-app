import {useSelector} from 'react-redux';
import {useEffect} from 'react';

import { loadCryptoCoins } from './cryptocoins-slice';
import { selectCryptoCoinsInfo, selectVisibleCryptoCoins } from './cryptocoins-selectors';
import { selectControls } from 'features/controls/controls-selectors';
import { RootState, useAppDispatch } from 'store';
import { CryptoToken } from 'types';

export const useCryptoCoins = (): [
  CryptoToken[],
  ReturnType<typeof selectCryptoCoinsInfo>
] => {
  const dispatch = useAppDispatch();
  const controls = useSelector(selectControls);
  const cryptocoins = useSelector((state: RootState) => selectVisibleCryptoCoins(state, controls));
  const {status, error, qty} = useSelector(selectCryptoCoinsInfo);

  useEffect(() => {
    if (!qty) {
      dispatch(loadCryptoCoins());
    }
  }, [qty, dispatch]);

  return [cryptocoins, {status, error, qty}];
}
