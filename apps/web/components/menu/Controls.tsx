import React from 'react';

type ExpandCollapseControlsProps = {
  onExpandAll: () => void;
  onCollapseAll: () => void;
};

const ExpandCollapseControls: React.FC<ExpandCollapseControlsProps> = ({ onExpandAll, onCollapseAll }) => {
  return (
    <div className="flex gap-4 mb-6">
      <button
        onClick={onExpandAll}
        className="px-4 py-2 bg-gray-900 text-white rounded-lg text-sm hover:bg-gray-800 transition-colors"
      >
        Expand All
      </button>
      <button
        onClick={onCollapseAll}
        className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg text-sm hover:bg-gray-50 transition-colors"
      >
        Collapse All
      </button>
    </div>
  );
};

export default ExpandCollapseControls;
