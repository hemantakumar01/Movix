import './css/carousal.scss';
import React, { useRef } from 'react';
import { AiFillLeftCircle, AiFillRightCircle } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import dayjs from 'dayjs';

import Img from './Img';
import ContentWrapper from './ContentWrapper';
import CircleRating from './CircleRating';
import PosterFallback from '../assets/no-poster.png';
import Genres from './Genres';
const Carousal = ({ data, loading, Popular, title }) => {
  const carousalContainer = useRef();
  const { url } = useSelector(state => state.home);
  const navigate = useNavigate();
  const navigation = dir => {
    const container = carousalContainer.current;
    const scrollAmount =
      dir === 'left'
        ? container.scrollLeft - (container.offsetWidth + 20)
        : container.scrollLeft + (container.offsetWidth + 20);

    container.scrollTo({
      left: scrollAmount,
      behavior: 'smooth',
    });
  };
  const skeleton = () => {
    return (
      <div className="skeletonItem">
        <div className="posterBlock skeleton"></div>
        <div className="textBlock">
          <div className="title skeleton"></div>
          <div className="date skeleton"></div>
        </div>
      </div>
    );
  };
  return (
    <div className="carousel">
      <ContentWrapper>
        {title && <div className="carouselTitle">{title}</div>}
        <AiFillLeftCircle
          style={Popular ? Popular : { color: 'white', fontSize: '60px' }}
          className="carouselLeftNav arrow "
          onClick={() => navigation('left')}
        />

        <AiFillRightCircle
          style={Popular ? Popular : { color: 'white', fontSize: '60px' }}
          className="carouselRightNav arrow text-red-600  "
          onClick={() => navigation('right')}
        />
        {!loading ? (
          <div className="carouselItems " ref={carousalContainer}>
            {data?.map(item => {
              const posterUrl = item?.poster_path
                ? url?.backdrop + item?.poster_path
                : PosterFallback;
              return (
                <div
                  key={item?.id}
                  className="carouselItem"
                  onClick={() =>
                    navigate(
                      `/${
                        item?.media_type === undefined
                          ? 'movie'
                          : item?.media_type
                      }/${item?.id}`,
                    )
                  }
                >
                  <div className="posterBlock">
                    <Img src={posterUrl} />
                    <CircleRating rating={item?.vote_average.toFixed(1)} />
                    <Genres data={item?.genre_ids.slice(0, 2)} />
                  </div>
                  <div className="textBlock">
                    <span className="title">{item?.title || item?.name}</span>
                    <span className="date">
                      {dayjs(item.release_Date).format('MMM D, YYYY')}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="loadingSkeleton">
            {skeleton()}
            {skeleton()}
            {skeleton()}
            {skeleton()}
            {skeleton()}
            {skeleton()}
            {skeleton()}
            {skeleton()}
            {skeleton()}
          </div>
        )}
      </ContentWrapper>
    </div>
  );
};

export default Carousal;
