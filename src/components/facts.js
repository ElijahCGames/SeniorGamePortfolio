import styled from '@emotion/styled';
import React from 'react';
import StyledSkewedSection from './skewed-section';
import { StyledH1 } from './_shared/styled-headings';

const StyledLogoSection = styled.section`
  width: 100%;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;

const StyledFactNumber = styled.section`
  display: flex;
  flex-direction: column;
  padding: 1rem;

  & > .number {
    margin-left: 2rem;
    margin-bottom: 1rem;
    font-size: 2rem;
    font-weight: bold;
  }

  & > .fact {
    position: relative;
    text-transform: uppercase;
    font-size: 0.8rem;
    padding: 0.5rem 1rem;
    background-color: var(--bg-color);
    margin-left: 2rem;

    &:before {
      content: '';
      position: absolute;
      top: 50%;
      left: -2rem;
      width: 1rem;
      height: 2px;
      background-color: var(--primary-color);
    }
  }
`;

const Facts = () => {
  return (
    <StyledSkewedSection angle={10}>
      <StyledLogoSection>
        <StyledFactNumber>
          <span className="number">39,000</span>
          <span className="fact">Itch.io Views</span>
        </StyledFactNumber>
        <StyledFactNumber>
          <span className="number">VOX and FORBES</span>
          <span className="fact">Features</span>
        </StyledFactNumber>
        <StyledFactNumber>
          <span className="number">11</span>
          <span className="fact">Published Games</span>
        </StyledFactNumber>
      </StyledLogoSection>
    </StyledSkewedSection>
  );
};

export default Facts;
