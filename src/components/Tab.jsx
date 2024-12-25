import React, { useState } from 'react';

const Tab = ({contents}) => {
    const [activeTab, setActiveTab] = useState(0);

    const selectTab = (index) => {
        setActiveTab(index);
    };

    return (
        <div className="tab-container">
            <div className="text-center tab-header">
                <select onChange={(e) => selectTab(e.target.value)}>
                    {contents && contents.map(({name}, index) => (
                        <option value={index}>{name}</option>
                    ))}
                </select>
            </div>
            <div className="tab-content">
                {contents[activeTab].component}
            </div>
        </div>
    );
};

export default Tab;