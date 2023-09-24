import React, { useState } from 'react';

import './css/videoSection.scss';

import ContentWrapper from './ContentWrapper';
import { PlayIcon } from './PlayIcon';
import VideoPopUp from './VideoPopUp';
import Img from './Img';

const VideosSection = ({ data, loading }) => {
  const [show, setShow] = useState(false);
  const [videoId, setVideoId] = useState(null);

  const loadingSkeleton = () => {
    return (
      <div className="skItem">
        <div className="thumb skeleton"></div>
        <div className="row skeleton"></div>
        <div className="row2 skeleton"></div>
      </div>
    );
  };

  return (
    <div className="videosSection">
      <ContentWrapper>
        <div className="sectionHeading">Official Videos</div>
        {!loading ? (
          <div className="videos">
            {data?.results?.map(video => (
              <div
                key={video?.id}
                className="videoItem"
                onClick={() => {
                  videoId(video.key);
                  setShow(true);
                }}
              >
                <div className="videoThumbnail">
                  <Img src={`https://img.youtube.com/vi/${video.key}/0.jpg`} />
                  <PlayIcon />
                </div>
                <div className="videoTitle">{video?.name}</div>
              </div>
            ))}
          </div>
        ) : (
          <div className="videoSkeleton">
            {loadingSkeleton()}
            {loadingSkeleton()}
            {loadingSkeleton()}
            {loadingSkeleton()}
          </div>
        )}
      </ContentWrapper>
      <VideoPopUp
        show={show}
        setShow={setShow}
        videoId={videoId}
        setVideoId={setVideoId}
      />
    </div>
  );
};

export default VideosSection;
