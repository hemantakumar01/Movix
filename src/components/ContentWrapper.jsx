import React from 'react';

const ContentWrapper = ({ children }) => {
  return (
    <div className="contantWrapper w-full max-w-[1200px] mx-auto my-0 px-0 py-5 ">
      {children}
    </div>
  );
};

export default ContentWrapper;
