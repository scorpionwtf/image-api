"use client"
import { useState } from 'react';

type Tab = 'upscale' | 'reimagine';

interface TabSwitcherProps {
  selectedTab: Tab;
  setSelectedTab: (tab: Tab) => void;
}

const TabSwitcher: React.FC<TabSwitcherProps> = ({ selectedTab, setSelectedTab }) => {
  return (
    <div className="flex justify-center mb-6">
      <button
        className={`px-4 py-2 ${selectedTab === 'upscale' ? 'bg-blue-500 text-white' : 'bg-gray-200'} rounded-l shadow-xl`}
        onClick={() => setSelectedTab('upscale')}
      >
        Image Upscaler
      </button>
      <button
        className={`px-4 py-2 ${selectedTab === 'reimagine' ? 'bg-blue-500 text-white' : 'bg-gray-200'} rounded-r shadow-xl`}
        onClick={() => setSelectedTab('reimagine')}
      >
        Reimagine Upscaler
      </button>
    </div>
  );
};

export default TabSwitcher;
