import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';

import styles from './collection.module.css';

const query = graphql`
  query MyQuery {
    allFile(filter: {dir: {regex: "/src/photos$/"}}, sort: {fields: name}) {
      edges {
        node {
          name
          publicURL
        }
      }
    }
  }
`;

type FileData = {
  name: string;
  publicURL: string;
};

type FileNode = {
  node: FileData
};

const Collection: React.FC = () => {
  const data = useStaticQuery(query);
  const photos: Array<FileNode> = data.allFile.edges;

  return (
    <section className={styles.collection}>
      {photos.map(({ node: { publicURL } }) => (
        <div className={styles.item}>
          <img key={publicURL} src={publicURL} />
        </div>
      ))}
    </section>
  );
};

export default Collection;
