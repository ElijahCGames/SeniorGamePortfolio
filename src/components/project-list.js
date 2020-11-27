import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import React from 'react';
import Icon from './icon';
import Img from 'gatsby-image';
import TechList from './tech-list';
import { mq } from './_shared/media';
import { StyledImageContainer } from './_shared/styled-image-container';
import { StyledContentLink } from './_shared/styled-content-link';
import { StyledH2 } from './_shared/styled-headings';
import { flexEnd } from './_shared/styled-mixins';
import { StyledTextSection } from './_shared/styled-text-section';

const StyledProjectContainer = styled.article`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  grid-gap: 2.5rem;
  margin-top: 2.5rem;

  ${mq.gt.xs} {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const StyledProject = styled.article`
  display: flex;
  flex-direction: column;
  padding-top: 2.5rem;
`;
const StyledHeader = styled.header`
  display: flex;
  justify-content: space-between;
`;
const StyledLinkContainer = styled.section`
  ${flexEnd};
  margin: 10px 0;

  & > a {
    display: flex;
    justify-content: left;
    align-items: center;
    color: var(--body-color);

    &:hover {
      color: var(--primary-color);
    }
  }

  & svg {
    fill: currentColor;
    margin: 0 0.5rem;
  }
`;
const StyledInfoContainer = styled.section`
  display: flex;
  flex-direction: column;
  position: relative;
`;
const StyledProjectText = styled(StyledTextSection)`
  > p {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    overflow: hidden;
  }
`;

const ProjectList = ({ projects }) => {
  const myProjects = projects.map((project) => {
    const title = project.frontmatter.title;
    const link = `/projects` + project.fields.slug;
    const demoLink = project.frontmatter.demo_link;
    const repoLink = project.frontmatter.repo_link;
    const coverImage = project.frontmatter.cover_image ? project.frontmatter.cover_image.childImageSharp.fluid : null;
    const description = project.frontmatter.description;
    const demoLinkLabel = `featured project ${title} demo`;
    const repoLinkLabel = `featured project ${title} repo`;

    return (
      <StyledProject key={title}>
        <StyledHeader>
          <StyledContentLink href={link ? link : demoLink ? demoLink : repoLink ? repoLink : '#'} rel="noopener">
            <StyledH2>{title}</StyledH2>
          </StyledContentLink>
          <StyledLinkContainer>
            {demoLink && (
              <a href={demoLink} target="_blank" rel="noopener" title="Demo Link" aria-label={demoLinkLabel}>
                <Icon icon="itch-io" prefix="fab" />
              </a>
            )}          
            {repoLink && (
              <a href={repoLink} target="_blank" rel="noopener" title="Repo Link" aria-label={repoLinkLabel}>
                <Icon icon="github" prefix="fab" />
              </a>
            )}
          </StyledLinkContainer>
        </StyledHeader>
        <a
          aria-label={demoLink ? demoLinkLabel : repoLink ? repoLinkLabel : `featured project ${title}`}
          href={link ? link : demoLink ? demoLink : repoLink ? repoLink : '#'}
          rel="noopener"
        >
          {coverImage && (
            <StyledImageContainer hasHover>
              <Img fluid={coverImage} />
            </StyledImageContainer>
          )}
        </a>
        <StyledInfoContainer>
          <StyledProjectText><p>{description}</p></StyledProjectText>
          <TechList techs={project.frontmatter.techs} />
        </StyledInfoContainer>
      </StyledProject>
    );
  });

  return (
    <StyledProjectContainer>{myProjects}</StyledProjectContainer>
  );
};

ProjectList.propTypes = {
  projects: PropTypes.array.isRequired,
};

export default ProjectList;
