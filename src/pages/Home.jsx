import React from 'react';
import HeroBanner from '../components/HeroBanner';
import Tranding from '../components/Tranding';
import Popular from '../components/Popular';
import TopRated from '../components/TopRated';

const Home = () => {
  return (
    <>
      <HeroBanner />
      <Tranding />
      <Popular />
      <TopRated />
    </>
  );
};

export default Home;
