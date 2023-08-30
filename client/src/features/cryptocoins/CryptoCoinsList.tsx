import { useNavigate } from 'react-router-dom';

import { CryptoToken } from 'types';
import { List } from 'components/List';
import { Card } from 'components/Card';
import { useCryptoCoins } from './use-cryptocoins';


type Image = {
  [x: string]: any
}

function importAll(r: any) {
  let images: Image = {};
  
  r.keys().forEach((item: string, index: number) => { 
    images[item.replace('./', '')] = r(item); 
  });


  return images 
}

const images = importAll(require.context('assets/cryptocurrency-icons/32/icon', false, /\.(png|jpe?g|svg)$/));


const CryptoCoinsList = () => {

  const navigate = useNavigate();

  const [cryptocoins, {error, status}] = useCryptoCoins();

  return (
    <>
      {error && <h2>Can't fetch data</h2>}
      {status === 'loading' && <h2>Loading...</h2>}

      {status === 'received' && (
      <List>
        {cryptocoins.map((c) => {
          let token = c.symbol.toLowerCase()

          if(!images[`${token}.png`] ) {
            return null;
          }

          const cryptocoinsInfo: CryptoToken = {
            name: c.name,
            logo: images[`${token}.png`],
            symbol: c.symbol
          }
          
          return (
            <Card
              key={c.name}
              onClick={() => void navigate(`/${c.symbol}`)}
              {...cryptocoinsInfo}
            />
          );
        })}
      </List>
      )}
    </>
  )
}

export {CryptoCoinsList};
