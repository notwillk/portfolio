import React from 'react';

import styles from './footer.module.css';

type Props = {
    siteAuthor: string;
}

const footer: React.FC<Props> = ({siteAuthor}) => (
  <footer className={styles.footer}>
    © Copyright 2017 – {new Date().getFullYear()} by <a href="https://www.twitter.com/willk" rel="noopener noreferrer" target="_blank">{siteAuthor}</a>
  </footer>
);

export default footer;
