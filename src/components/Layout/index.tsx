import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';

import Header from '../Header';
import Footer from '../Footer';
import styles from './layout.module.css';

type Props = {
  children?: React.ReactNode;
};

const Layout: React.FC<Props> = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
          author
        }
      }
    }
  `);

  const { title, author } = data.site.siteMetadata;

  return (
    <div className={styles.layout}>
      <Header siteTitle={title} />
      <main className={styles.main}>{children}</main>
      <Footer siteAuthor={author} />
    </div>
  );
};

export default Layout;
