import React from 'react';

import styles from './header.module.css';

type Props = {
  siteTitle: string;
};

const Header: React.FC<Props> = ({ siteTitle = '' }) => (
  <header className={styles.header}>
    <h1 style={{ margin: 0 }}>{siteTitle}</h1>
  </header>
);

export default Header;
