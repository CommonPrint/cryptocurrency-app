import styled from 'styled-components';
import { CryptoToken } from 'types';


const Wrapper = styled.article`
  display: flex;
  align-items: center;
  padding: 5px 10px;
  border-radius: var(--radii);
  background-color: car(--colors-ui-base);
  box-shadow: var(--shadow);
  cursor: pointer;
  overflow: hidden;

  transition: 0.7s transform ease;

  &:hover {
    transform: translateY(-10px) scale(1.05);
    box-shadow: var(--shadow-hover);
  }
`;

const CardImage = styled.img`
  display: block;
  object-fit: cover;
  object-position: center;
`;


const CardBody = styled.div`
  padding: 10px;
`;

const CardTitle = styled.h3`
  margin: 0;
  font-size: var(--fs-md);
  font-weight: var(--fw-bold);
`;


interface CardProps extends CryptoToken {
  onClick: () => void,
}

// Вместо {logo} взять картинки из assets
export const Card = ({ logo, name, symbol, subreddit, onClick }: CardProps) => {
  return (
    <Wrapper onClick={onClick}>
      <CardImage src={logo} alt={name} />
      <CardBody>
        <CardTitle>{name}</CardTitle>
      </CardBody>
    </Wrapper>
  );
};
