import React from 'react';

import Layout from '../components/Layout';

const NotFoundPage = () => {
  React.useEffect(() => {
    window.location.href = '/';
  });
  return <Layout />;
};

export default NotFoundPage;
