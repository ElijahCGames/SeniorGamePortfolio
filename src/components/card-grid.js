import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import React from 'react';
import Icon from './icon';
import { mq } from './_shared/media';
import { StyledH1 } from './_shared/styled-headings';
import { StyledSection } from './_shared/styled-section';

const StyledTextSection = styled.section`
  white-space: pre-line;
`;
const StyledFeatureGridContainer = styled.section`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  grid-gap: 2.5rem;
  margin-top: 2.5rem;
  width: 100%;

  ${mq.gt.xs} {
    grid-template-columns: repeat(2, 1fr);
  }
  ${mq.gt.sm} {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const StyledFeatureCard = styled.a`
  border: 3px solid var(--primary-color);
  border-radius: var(--radius);

  display: flex;
  align-items: center;
  flex-direction: column;
  min-height: 100px;
  padding: 1rem;
  background-color: var(--bg-content-color);
  color: var(--primary-color) !important;
  position: relative;
  border: none;

  & svg {
    height: 2rem;
    width: 2rem;
    font-size: 2rem;
    transition: all ease var(--transition-slow)
  }

  &:hover > *{
    color: var(--secondary-color) !important;
  }

  &:after {
    content: '';
    z-index: -1;
    border: 3px solid var(--primary-color);
    position: absolute;
    bottom: -9px;
    right: -9px;
    width: 100%;
    height: 100%;
    transition: all ease var(--transition-slow);
  }

  &:hover:after {
    border: 3px solid var(--secondary-color);
    bottom: -15px;
    right: -15px;
  }
`;
const StyledCardLabel = styled.h2`
  font-size: 1.5rem;
  margin: 1rem 0;
  color: var(--primary-color);
 }
`;
const StyledDivider = styled.div`
  width: 15%;
  height: 2px;
  background-color: var(--primary-color);
  margin-bottom: 1rem;
`;
const StyledFeatureDescription = styled.p`
  font-size: 1rem;
`;

const CardGrid = ({ cards, description, title, id = null }) => {
  const featureCards = cards.map(({ icon, prefix, label, link }, index) => {
    return (
      <StyledFeatureCard key={index} href={link}>
        <Icon icon={icon} prefix={prefix}/>
        <StyledCardLabel>{label}</StyledCardLabel>
      </StyledFeatureCard>
    );
  });

  return (
    <StyledSection id='resume'>
      {title && <StyledH1>{title}</StyledH1>}
      <StyledFeatureDescription dangerouslySetInnerHTML={{ __html: description }} />
      <StyledFeatureGridContainer>{featureCards}</StyledFeatureGridContainer>
    </StyledSection>
  );
};

CardGrid.propTypes = {
  cards: PropTypes.array.isRequired,
  description: PropTypes.string.isRequired,
  id: PropTypes.string,
  title: PropTypes.string,
};

export default CardGrid;
