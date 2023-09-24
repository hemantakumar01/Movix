import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import { useSelector } from 'react-redux';
import Img from '../components/Img';
import ContentWrapper from '../components/ContentWrapper';
import './css/homeBanner.scss';

const HeroBanner = () => {
  const [background, setBackground] = useState('');
  const [query, setQuery] = useState('');
  const { url } = useSelector(state => state.home);
  const navigate = useNavigate();
  const searchQueryHandler = event => {
    if (event.key === 'Enter' && query.length > 0) {
      navigate(`/search/${query}`);
    }
  };
  const { data, loading } = useFetch('/movie/upcoming');
  useEffect(() => {
    const bg =
      url.backdrop +
      data?.results?.[Math.floor(Math.random() * 20)]?.backdrop_path;
    setBackground(bg);
  }, [data]);
  return (
    <ContentWrapper>
      <div className="heroBanner mx-auto my-0 max-w-[1200px] ">
        {!loading && (
          <>
            <div className="backDropImage absolute  opacity-50 top-0 left-0 overflow-hidden w-full h-[480px]  lg:h-[750px]">
              <Img src={background} />
            </div>
          </>
        )}
        <div className="opacity-layer"></div>
        <ContentWrapper>
          <div className="heroWrapper w-full h-[480px] bg-[var(--black) flex items-center relative] text-center justify-center mx-auto my-0 flex-col relative max-w-800px ">
            <div className="">
              <div className="title text-[50px] font-[700] mb-3 md:mb-0 md:text-[90px]">
                Welcome
              </div>
              <div className="sub-title text-lg font-[500] mb-10 md:text-2xl">
                Million of movies, TV shows and people to discover. Explore now
              </div>
            </div>
            <div className="serarchInput flex w-full items-center justify-center md:px-10 px-5 ">
              <input
                className="relative w-[calc(100%-100px)] h-14 bg-white text-gray-800 border-0 outline-none rounded-tl-[30px] rounded-bl-[30px] pl-5 text-sm md:w-[calc(100%-150px)] md:h-16 md:text-xl md:py-0 md:px-8"
                type="text"
                placeholder="Search for movies or tv shows...."
                onKeyUp={searchQueryHandler}
                onChange={e => setQuery(e.target.value)}
              />
              <button className="w-[100px] h-14 bg-gradient-to-t transform rotate-98.3 from-yellow-500 via-red-600 to-pink-800 text-white border-0 outline-none rounded-tr-[30px] rounded-br-[30px] text-base cursor-pointer md:w-[150px] md:h-16 md:text-lg  ">
                Search
              </button>
            </div>
          </div>
        </ContentWrapper>
      </div>
    </ContentWrapper>
  );
};

export default HeroBanner;
