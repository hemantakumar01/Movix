import React, { Fragment, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import dayjs from 'dayjs';

import './css/detailBanner.scss';

import ContentWrapper from './ContentWrapper';
import useFetch from '../hooks/useFetch';
import Genres from './Genres';
import CircleRating from './CircleRating';
import Img from './Img.jsx';
import PosterFallback from '../assets/no-poster.png';
import { PlayIcon } from './PlayIcon';
import VideoPopup from './VideoPopUp';

const DetailsBanner = ({ videos, crew }) => {
  const { mediaType, id } = useParams();
  const [show, setShow] = useState(false);
  const [videoId, setVideoId] = useState(null);

  const { data, loading } = useFetch(`/${mediaType}/${id}`);
  const { url } = useSelector(state => state.home);

  const _genres = data?.genres?.map(g => g.id);
  const director = crew?.filter(f => f.job === 'Director').slice(0, 4);
  const writer = crew
    ?.filter(f => f.job === 'Screenplay' || 'Story' || 'Writer')
    .slice(0, 4);
  const toHoursAndMinutes = totalMinutes => {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${hours}h${minutes > 0 ? ` ${minutes}m` : ''}`;
  };
  return (
    <div className="detailsBanner">
      {!loading ? (
        <Fragment>
          {!!data && (
            <>
              <div className="backdrop-img">
                <Img src={url?.backdrop + data?.backdrop_path} />
              </div>
              <div className="opacity-layer"></div>
              <ContentWrapper>
                <div className="content">
                  <div className="left">
                    {data?.poster_path ? (
                      <Img
                        className={'posterImg'}
                        src={url?.backdrop + data?.poster_path}
                      />
                    ) : (
                      <Img className={'posterImg'} src={PosterFallback} />
                    )}
                  </div>
                  <div className="right">
                    <div className="title">{`${
                      data.name || data.title
                    } (${dayjs(data.release_date).format('YYYY')})`}</div>
                    <div className="subtitle">
                      {!data?.tagline ? 'No tagline' : data?.tagline}
                    </div>
                    <Genres data={_genres} />
                    <div className="row">
                      <CircleRating rating={data?.vote_average?.toFixed(1)} />
                      <div
                        className="playbtn"
                        onClick={() => {
                          console.log('clicked');
                          setShow(true);
                          setVideoId(videos?.key);
                          console.log('clicked');
                        }}
                      >
                        <PlayIcon />
                        <span>Watch Trailer</span>
                      </div>
                    </div>
                    <div className="overview">
                      <div className="heading">Overview</div>
                      <div className="description">{data.overview}</div>
                    </div>
                    <div className="info">
                      {data.status && (
                        <div className="infoItem">
                          <div className="text bold">Status: </div>
                          <span className="text">{data.status}</span>
                        </div>
                      )}
                      {data.release_date && (
                        <div className="infoItem">
                          <div className="text bold">Release: </div>
                          <span className="text">
                            {dayjs(data.release_date).format('MMM D YYYY')}
                          </span>
                        </div>
                      )}
                      {data.runtime && (
                        <div className="infoItem">
                          <div className="text bold">Status: </div>
                          <span className="text">
                            {toHoursAndMinutes(data.runtime)}
                          </span>
                        </div>
                      )}
                    </div>
                    {director?.length > 0 && (
                      <div className="info">
                        <span className="text bold">
                          Director:{' '}
                          <span className="text">
                            {director?.map((d, i) => (
                              <span key={i}>
                                {d?.name} {director?.length - 1 !== i && ', '}
                              </span>
                            ))}
                          </span>
                        </span>
                      </div>
                    )}

                    {writer?.length > 0 && (
                      <div className="info">
                        <span className="text bold">
                          Writer:{' '}
                          <span className="text">
                            {writer?.map((d, i) => (
                              <span key={i}>
                                {d?.name} {writer?.length - 1 !== i && ', '}
                              </span>
                            ))}
                          </span>
                        </span>
                      </div>
                    )}

                    {data?.created_by?.length > 0 && (
                      <div className="info">
                        <span className="text bold">
                          Creator:{' '}
                          <span className="text">
                            {data?.created_by?.map((d, i) => (
                              <span key={i}>
                                {d?.name}{' '}
                                {data?.created_by?.length - 1 !== i && ', '}
                              </span>
                            ))}
                          </span>
                        </span>
                      </div>
                    )}
                  </div>
                </div>
                <VideoPopup
                  show={show}
                  setShow={setShow}
                  videoId={videoId}
                  setVideoId={setVideoId}
                />
              </ContentWrapper>
            </>
          )}
        </Fragment>
      ) : (
        <div className="detailsBannerSkeleton">
          <ContentWrapper>
            <div className="left skeleton"></div>
            <div className="right">
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
            </div>
          </ContentWrapper>
        </div>
      )}
    </div>
  );
};

export default DetailsBanner;
