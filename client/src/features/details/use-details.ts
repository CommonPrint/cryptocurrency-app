import {useSelector} from 'react-redux';
import {useEffect} from 'react';

import { clearDetails, loadCryptoCoinByName } from './details-slice';
import { selectDetails } from './details-selectors';
import { useAppDispatch } from 'store';

export const useDetails = (name: string) => {
  const dispatch = useAppDispatch();
  const details = useSelector(selectDetails);

  console.log('Name coin from use-details: ', name);

  useEffect(() => {
    dispatch(loadCryptoCoinByName(name));

    return () => {
      dispatch(clearDetails());
    }
  }, [name, dispatch]);

  console.log('Details coin from use-details: ', details.currentCryptoCoin);

  return details;
}
