import { useNavigate, useParams } from 'react-router-dom';
import { IoArrowBack } from 'react-icons/io5';

import { Button } from 'components/Button';
import { CryptoTokenDetails } from 'features/details/CryptoTokenDetails';


export const Details = () => {
  const { name } = useParams();
  const navigate = useNavigate();

  return (
    <div>
      <Button onClick={() => navigate(-1)}>
        <IoArrowBack /> Back
      </Button>
      <CryptoTokenDetails name={name} navigate={navigate} />
    </div>
  );
};
