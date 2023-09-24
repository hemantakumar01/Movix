import React from 'react';

import Carousal from './Carousal';
import useFetch from '../hooks/useFetch';

const Recommendation = ({ mediaType, id }) => {
  const { data, loading, error } = useFetch(
    `/${mediaType}/${id}/recommendations`,
  );

  return (
    <Carousal
      title="Recommendations"
      data={data?.results}
      loading={loading}
      endpoint={mediaType}
      Popular={{
        color: 'white',
        fontSize: '60px',
        top: '319%',
      }}
    />
  );
};

export default Recommendation;
