import { Controls } from 'features/controls/Controls';
import { CryptoCoinsList } from 'features/cryptocoins/CryptoCoinsList';

export const HomePage = () => {
  return (
    <>
      <Controls />
      <CryptoCoinsList />
    </>
  );
};
