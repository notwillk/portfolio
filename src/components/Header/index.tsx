import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';

import styles from './header.module.css';

const query = graphql`
  query FirstPhotoColorQuery {
    allFile(sort: { fields: name }, limit: 1) {
      edges {
        node {
          colors {
            vibrant
            darkVibrant
            lightVibrant
            muted
            darkMuted
            lightMuted
          }
        }
      }
    }
  }
`;

type Props = {
  siteTitle: string;
};

const Header: React.FC<Props> = ({ siteTitle = '' }) => {
  const data = useStaticQuery(query);
  const { colors } = data.allFile.edges[0].node;

  const style = {
    backgroundColor: colors.darkMuted,
    color: colors.lightVibrant,
  };

  return (
    <header className={styles.header} style={style}>
      {siteTitle}
    </header>
  );
};

export default Header;
