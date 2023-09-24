import React, { useState } from 'react';
import './css/switchTabs.scss';

const SwitchTabs = ({ data, onTabChange }) => {
  const [seletedTab, setSeletedTab] = useState(0);
  const [left, setLeft] = useState(0);
  const activeTab = (tab, index) => {
    setLeft(index * 100);
    setTimeout(() => {
      setSeletedTab(index);
    }, 300);

    onTabChange(tab, index);
  };
  return (
    <div className="switchingTabs">
      <div className="tabItems">
        {data.map((tab, index) => (
          <span
            key={index}
            className={`tabItem ${seletedTab === index ? 'active' : ''}`}
            onClick={() => activeTab(tab, index)}
          >
            {tab}
          </span>
        ))}
        <span className="movingBg" style={{ left }}></span>
      </div>
    </div>
  );
};

export default SwitchTabs;
