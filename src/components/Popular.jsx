import React, { useState } from 'react';
import ContentWrapper from '../components/ContentWrapper';
import Carousal from '../components/Carousal';
import SwitchTabs from './SwitchTabs';
import useFetch from '../hooks/useFetch';

const Popular = () => {
  const [endpoint, setEndpoint] = useState('movie');
  const { data, loading } = useFetch(`/${endpoint}/popular`);
  const onTabChange = tab => {
    setEndpoint(tab === 'Movies' ? 'movie' : 'tv');
  };
  return (
    <div className="carouselSection z-[1] my-24 ">
      <ContentWrapper>
        <div className="flex justify-between z-[1]">
          <span className="carouselTitle text-4xl z-[1] ">What's Popular</span>
          <SwitchTabs data={['Movies', 'TV Shows']} onTabChange={onTabChange} />
        </div>
      </ContentWrapper>
      <Carousal
        data={data?.results}
        loading={loading}
        Popular={{
          color: 'white',
          fontSize: '60px',
          top: '200%',
        }}
      />
    </div>
  );
};

export default Popular;
