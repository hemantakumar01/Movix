import React, { useState } from 'react';
import ContentWrapper from '../components/ContentWrapper';
import Carousal from '../components/Carousal';
import SwitchTabs from './SwitchTabs';
import useFetch from '../hooks/useFetch';

const Tranding = () => {
  const [endpoint, setEndpoint] = useState('day');
  const { data, loading } = useFetch(`/trending/all/${endpoint}`);
  const onTabChange = tab => {
    setEndpoint(tab === 'Day' ? 'day' : 'week');
  };
  console.log(data);
  return (
    <div className="carouselSection z-[1] my-24 ">
      <ContentWrapper>
        <div className="flex justify-between z-[1]">
          <span className="carouselTitle text-4xl z-[1] ">Tranding</span>
          <SwitchTabs data={['Day', 'Week']} onTabChange={onTabChange} />
        </div>
      </ContentWrapper>
      <Carousal data={data?.results} loading={loading} />
    </div>
  );
};

export default Tranding;
