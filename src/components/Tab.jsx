import React, { useState } from "react";

const Tab = ({ contents }) => {
  const [activeTab, setActiveTab] = useState(0);

  const selectTab = (index) => {
    setActiveTab(index);
  };

  return (
    <div className="tab-container">
      <div className="text-center tab-header">
        <div className="tab-list-wrapper">
          <ul className="tab-list">
            {contents &&
              contents.map(({ name }, index) => (
                <li
                  key={index}
                  className={activeTab === index ? "active" : ""}
                  onClick={() => selectTab(index)}
                  data-content={name.replace(/\s+/g, "_")}
                >
                  {name}
                </li>
              ))}
          </ul>
        </div>
      </div>
      <div className="tab-content">{contents[activeTab].component}</div>
    </div>
  );
};

export default Tab;
