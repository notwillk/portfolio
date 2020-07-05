import React from 'react';
import { useStaticQuery, graphql, navigate } from 'gatsby';

import styles from './collection.module.css';

const query = graphql`
  query MyQuery {
    allFile(filter: { dir: { regex: "/src/photos$/" } }, sort: { fields: name }) {
      edges {
        node {
          id
          publicURL
        }
      }
    }
  }
`;

type FillMode = 'cover' | 'contain';

type FileData = {
  id: string;
  publicURL: string;
};

type FileNode = {
  node: FileData;
};

type Props = {
  photoId?: string;
};

const swapFillMode: { [key in FillMode]: FillMode } = {
  cover: 'contain',
  contain: 'cover',
};

const Collection: React.FC<Props> = ({ photoId }) => {
  const [selectedPhotoId, setSelectedPhotoId] = React.useState<string | undefined>(photoId);
  const [fillMode, setFillMode] = React.useState<FillMode>('cover');
  const data = useStaticQuery(query);
  const photos: Array<FileNode> = data.allFile.edges;

  const selectedPhotoIndex = photos.findIndex(({ node: { id } }) => id === selectedPhotoId);

  React.useEffect(() => {
    if (photoId && selectedPhotoIndex === -1) {
      navigate('/', { replace: true });
    }
  }, [photoId, selectedPhotoIndex]);

  return (
    <>
      <summary className={styles.collection}>
        {photos.map(({ node: { id, publicURL } }) => (
          <div key={id} className={styles.item} onClick={() => setSelectedPhotoId(id)}>
            <img src={publicURL} />
          </div>
        ))}
      </summary>
      {selectedPhotoIndex !== -1 && (
        <article className={styles.zoomin}>
          <img
            className={styles[fillMode]}
            src={photos[selectedPhotoIndex].node.publicURL}
            onDoubleClick={() => setSelectedPhotoId(undefined)}
            onClick={() => setFillMode(swapFillMode[fillMode])}
          />
          {selectedPhotoIndex > 0 && (
            <button
              className={styles.previous}
              onClick={() => setSelectedPhotoId(photos[selectedPhotoIndex - 1].node.id)}>
              Previous
            </button>
          )}
          {selectedPhotoIndex < photos.length - 1 && (
            <button
              className={styles.next}
              onClick={() => setSelectedPhotoId(photos[selectedPhotoIndex + 1].node.id)}>
              Next
            </button>
          )}
        </article>
      )}
    </>
  );
};

export default Collection;
