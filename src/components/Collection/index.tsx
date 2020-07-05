import React from 'react';
import { useStaticQuery, graphql, navigate } from 'gatsby';

import styles from './collection.module.css';

const query = graphql`
  query AllPhotosQueryWithMetadata {
    photoFiles: allFile(
      filter: { dir: { regex: "/src/photos$/" }, extension: { in: ["jpg", "webp"] } }
      sort: { fields: name, order: DESC }
    ) {
      nodes {
        id
        name
        publicURL
      }
    }
    metadataFiles: allFile(filter: { extension: { eq: "yaml" } }) {
      nodes {
        name
        childPhotosYaml {
          objectFit
          objectPosition
          alt
        }
      }
    }
  }
`;

type PhotoData = {
  name: string;
  id: string;
  publicURL: string;
};

type MetadataData = {
  name: string;
  childPhotosYaml?: {
    objectPosition: string;
    objectFit: string;
    alt: string;
  };
};

type CompiledMetadata = {
  [key: string]: {
    objectPosition?: string;
    objectFit?: string;
    alt?: string;
  };
};

type Props = {
  photoId?: string;
};

const Collection: React.FC<Props> = ({ photoId }) => {
  const [selectedPhotoId, setSelectedPhotoId] = React.useState<string | undefined>(photoId);
  const data = useStaticQuery(query);
  const photos: Array<PhotoData> = data.photoFiles.nodes;
  const metadata: Array<MetadataData> = data.metadataFiles.nodes;

  const metadataByName: CompiledMetadata = metadata.reduce(
    (acc, { name, childPhotosYaml = {} }) => ({ ...acc, [name]: childPhotosYaml }),
    {},
  );

  const selectedPhotoIndex = photos.findIndex(({ id }) => id === selectedPhotoId);

  React.useEffect(() => {
    if (photoId && selectedPhotoIndex === -1) {
      navigate('/', { replace: true });
    }
  }, [photoId, selectedPhotoIndex]);

  return (
    <>
      <summary className={styles.collection}>
        {photos.map(({ name, id, publicURL }) => (
          <div key={id} className={styles.item} onClick={() => setSelectedPhotoId(id)}>
            <img
              src={publicURL}
              style={{ objectPosition: metadataByName[name]?.objectPosition }}
              alt={metadataByName[name]?.alt}
            />
          </div>
        ))}
      </summary>
      {selectedPhotoIndex !== -1 && (
        <article className={styles.zoomin}>
          <img
            src={photos[selectedPhotoIndex].publicURL}
            onClick={() => setSelectedPhotoId(undefined)}
            style={{
              objectPosition: metadataByName[photos[selectedPhotoIndex].name]?.objectPosition,
              objectFit: metadataByName[photos[selectedPhotoIndex].name]?.objectFit,
            }}
            alt={metadataByName[name]?.alt}
          />
          {selectedPhotoIndex > 0 && (
            <button
              className={styles.previous}
              onClick={() => setSelectedPhotoId(photos[selectedPhotoIndex - 1].id)}>
              Previous
            </button>
          )}
          {selectedPhotoIndex < photos.length - 1 && (
            <button
              className={styles.next}
              onClick={() => setSelectedPhotoId(photos[selectedPhotoIndex + 1].id)}>
              Next
            </button>
          )}
        </article>
      )}
    </>
  );
};

export default Collection;
