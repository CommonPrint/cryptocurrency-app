import { NavigateFunction } from 'react-router-dom';
import { Info } from './Info';
import { useDetails } from './use-details';

interface CryptoTokenDetailsProps {
  navigate: NavigateFunction,
  name?: string,
}

const CryptoTokenDetails = ({ name = '', navigate }: CryptoTokenDetailsProps) => {

  const {status, error, currentCryptoCoin} = useDetails(name);

  let proto = useDetails(name).currentCryptoCoin;

  console.log('Proto inside: ', {...proto})

  console.log('currency crypto coin: '+ useDetails(name).currentCryptoCoin);
  console.log('metadata currency crypto coin: '+ useDetails(name).currentCryptoCoin?.metadata);
  console.log('statistics currency crypto coin: '+ useDetails(name).currentCryptoCoin?.statistics);

  return (
    <>
      {status === 'loading' && <h2>Loading...</h2>}
      {error && <h2>{error}</h2>}
      {currentCryptoCoin && <Info push={navigate} {...currentCryptoCoin} />}
    </>
  )
}

export {CryptoTokenDetails};
