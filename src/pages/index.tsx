import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';

import Layout from '../components/Layout';
import Collection from '../components/Collection';
import SEO from '../components/SEO';

const IndexPage = () => {
  return (
    <Layout>
      <SEO title="Home" />
      <Collection />
    </Layout>
  );
};

export default IndexPage;
