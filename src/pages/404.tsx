import React from 'react';
import { navigate } from 'gatsby';

import Layout from '../components/Layout';

const NotFoundPage = () => {
  React.useEffect(() => {
    navigate('/', { replace: true });
  }, []);
  return <Layout />;
};

export default NotFoundPage;
