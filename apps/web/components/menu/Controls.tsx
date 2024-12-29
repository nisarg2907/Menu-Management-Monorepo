import React from 'react';

interface ExpandCollapseControlsProps {
  onExpandAll: () => void;
  onCollapseAll: () => void;
  expandLabel?: string;
  collapseLabel?: string;
  isLoading?: boolean;
}

const ExpandCollapseControls: React.FC<ExpandCollapseControlsProps> = ({
  onExpandAll,
  onCollapseAll,
  expandLabel = "Expand All",
  collapseLabel = "Collapse All",
  isLoading = false
}) => {
  return (
    <div className="flex gap-4 mb-6">
      <button
        onClick={onExpandAll}
        disabled={isLoading}
        className="px-4 py-2 bg-gray-900 text-white rounded-lg text-sm hover:bg-gray-800 transition-colors disabled:opacity-50"
      >
        {expandLabel}
      </button>
      <button
        onClick={onCollapseAll}
        disabled={isLoading}
        className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg text-sm hover:bg-gray-50 transition-colors disabled:opacity-50"
      >
        {collapseLabel}
      </button>
    </div>
  );
};

export default ExpandCollapseControls;