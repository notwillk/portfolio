import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';

import styles from './header.module.css';

const query = graphql`
  query FirstPhotoColorQuery {
    allFile(
      filter: { dir: { regex: "/src/photos$/" }, extension: { in: ["jpg", "webp"] } }
      sort: { fields: name, order: DESC }
      limit: 1
    ) {
      nodes {
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
`;

type Props = {
  siteTitle: string;
};

const Header: React.FC<Props> = ({ siteTitle = '' }) => {
  const data = useStaticQuery(query);
  const { colors } = data.allFile.nodes[0];

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
