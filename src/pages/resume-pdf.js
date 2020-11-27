import styled from '@emotion/styled';
import React from 'react';
import Layout from '../components/layout';
import PropTypes from 'prop-types';
import SEO from '../components/seo';
import { blogMenuLinks } from '../components/_config/menu-links';
import { StyledFullHeightSection } from '../components/_shared/styled-section';

const StyledResume = styled.div`
    & > h1{
      color: var(--primary-color);
    }

    & > h2{
        color: var(--primary-color);
      }
`;

const Resume = ({
    data: {
      allMarkdownRemark: { nodes },
    },
  }) => {
    console.log({nodes});
    return (
        <Layout menuLinks={blogMenuLinks}>
        <SEO title="Resume" />
        <StyledFullHeightSection>
          <object data="../assets/resume.pdf" type="application/pdf" width="700px" height="700px">
            <embed src="../assets/resume.pdf">
              <p>This browser does not support PDFs. Please download the PDF to view it: <a href="../assets/resume.pdf">Download PDF</a>.</p>
            </embed>
          </object>
        </StyledFullHeightSection>
        </Layout>
    );
};

Resume.propTypes = {
    data: PropTypes.object.isRequired,
  };

export default Resume;

export const pageQuery = graphql`
  query {
    allMarkdownRemark(
      sort: { order: DESC, fields: frontmatter___date }
      limit: 1
      filter: { fileAbsolutePath: { regex: "/content/resume/" } }
    ) {
      nodes {
        frontmatter {
          date(formatString: "D MMMM, YYYY")
          title
          repo_link
          demo_link
          techs
          tags
          description
          cover_image {
            childImageSharp {
              fluid(maxWidth: 800) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
        html
        fields {
          slug
        }
      }
    }
  }
`;
