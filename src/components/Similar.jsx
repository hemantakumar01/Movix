import React from 'react';

import Carousal from '../components/Carousal';
import useFetch from '../hooks/useFetch';

const Similar = ({ mediaType, id }) => {
  const { data, loading, error } = useFetch(`/${mediaType}/${id}/similar`);

  const title = mediaType === 'tv' ? 'Similar TV Shows' : 'Similar Movies';

  return (
    <Carousal
      title={title}
      data={data?.results}
      loading={loading}
      endpoint={mediaType}
      Popular={{
        color: 'white',
        fontSize: '60px',
        top: '250%',
      }}
    />
  );
};

export default Similar;
