import styled from 'styled-components';

import { Search } from './Search';


const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  @media (min-width: 767px) {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
`;

export const Controls = () => {

  return (
    <Wrapper>
      <Search />
    </Wrapper>
  );
};
