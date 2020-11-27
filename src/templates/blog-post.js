import styled from '@emotion/styled';
import { graphql } from 'gatsby';
import Img from 'gatsby-image';
import PropTypes from 'prop-types';
import React from 'react';
import Icon from '../components/icon';
import Layout from '../components/layout';
import TagList from '../components/tag-list';
import TechList from '../components/tech-list';
import { blogMenuLinks } from '../components/_config/menu-links';
import { StyledH1 } from '../components/_shared/styled-headings';
import { StyledSection } from '../components/_shared/styled-section';

const StyledBlogSection = styled(StyledSection)`
  min-height: calc(100vh - var(--header-height));

  & > .gatsby-image-wrapper {
    width: 100%;
  }
`;
const StyledBlogTitle = styled(StyledH1)`
  margin-top: 3rem;
`;
const StyledSubTitle = styled.p`
  margin-top: -1rem;
  font-size: 0.9rem;
`;
const StyledDate = styled.div`
  font-size: 0.8rem;

  & span {
    font-weight: 500;
  }
`;

const StyledHeader = styled.header`
  display: flex;
  width:100%
`;
const StyledBlogText = styled.div`
  padding: 2rem;
  width: 100%;
  background: var(--bg-code);
  border-radius: var(--radius);
  border-top-left-radius: 0;
  border-top-right-radius: 0;
`;
const StyledIFrameContainer = styled.div`
  position: relative;
  overflow: hidden;
  width:100%;
  padding-top: 56.25%;
`;

const StyledIFrame = styled.iframe`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: 0;  
`;

const StyledLinkContainer = styled.a`
  padding: 0px 10px;
  }
`;

const BlogPost = ({ data }) => {
  const readingTime = data.markdownRemark.fields.readingTime.text;
  const post = data.markdownRemark;
  const coverImage = post.frontmatter.cover_image ? post.frontmatter.cover_image.childImageSharp.fluid : null;
  const { tags = [],techs = [], title, date, description, v_link} = post.frontmatter;
  const repoLink = post.frontmatter.repo_link;
  const demoLink = post.frontmatter.demo_link;
  const iosLink = post.frontmatter.ios_link;
  const androidLink = post.frontmatter.android_link;
  const demoLinkLabel = `featured project ${title} demo`;
  const repoLinkLabel = `featured project ${title} repo`;

  return (
    <Layout menuLinks={blogMenuLinks}>
      <StyledBlogSection>
        {v_link &&
        <StyledIFrameContainer>
          <StyledIFrame allowFullScreen={true} src={'https://www.youtube.com/embed/' + v_link}/>
        </StyledIFrameContainer>}
        <StyledHeader>
          <StyledBlogTitle>{title} <span style = {{float:'right'}}>
            {demoLink && (
              <StyledLinkContainer href={demoLink} target="_blank" rel="noopener" title="Demo Link" aria-label={demoLinkLabel}>
                <Icon icon="itch-io" prefix="fab" />
              </StyledLinkContainer>
            )}
            {repoLink && (
              <StyledLinkContainer href={repoLink} target="_blank" rel="noopener" title="Repository Link" aria-label={repoLinkLabel}>
                <Icon icon="github" prefix="fab" />
              </StyledLinkContainer>
            )}
            {iosLink && (
              <StyledLinkContainer href={repoLink} target="_blank" rel="noopener" title="Repository Link" aria-label={repoLinkLabel}>
                <Icon icon="apple" prefix="fab" />
              </StyledLinkContainer>
            )}
            {androidLink && (
              <StyledLinkContainer href={repoLink} target="_blank" rel="noopener" title="Repository Link" aria-label={repoLinkLabel}>
                <Icon icon="github" prefix="fab" />
              </StyledLinkContainer>
            )}</span></StyledBlogTitle>
        </StyledHeader>
        <StyledSubTitle>{description}</StyledSubTitle>
        <StyledDate>
          Released {date}. <span>{readingTime}.</span>
        </StyledDate>
        <TechList techs={techs} />
        {coverImage && <Img fluid={coverImage} />}
        <StyledBlogText dangerouslySetInnerHTML={{ __html: post.html }} />
        <TagList tags={tags}/>
      </StyledBlogSection>
    </Layout>
  );
};

BlogPost.propTypes = {
  data: PropTypes.object.isRequired,
};

export default BlogPost;

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        tags
        description
        techs
        v_link
        repo_link
        demo_link
        ios_link
        android_link
        date(formatString: "D. MMMM YYYY")
        cover_image {
          childImageSharp {
            fluid(maxWidth: 800) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
      fields {
        readingTime {
          text
        }
      }
    }
  }
`;
