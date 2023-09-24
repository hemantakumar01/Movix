import React from 'react';
import { useSelector } from 'react-redux';

const Genres = ({ data }) => {
  const { genres } = useSelector(state => state.home);
  return (
    <div className="genres  flex gap-1 ">
      {data?.map(g => {
        if (!genres[g]?.name) return;
        return (
          <div
            key={g}
            className="genre bg-[var(--pink)] p-1 text-xs text-white rounded-md whitespace-nowrap"
          >
            {genres[g]?.name}
          </div>
        );
      })}
    </div>
  );
};

export default Genres;
