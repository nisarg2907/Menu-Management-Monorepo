import React from 'react';
// import Image from 'next/image';
import { TreeItemProps } from '../../types';

const TreeItem: React.FC<TreeItemProps> = ({ item, isExpanded, onToggle, expandedItems }) => {
  const hasChildren = item.children && item.children.length > 0;

  return (
    <div className="relative">
      <div
        className={`flex items-center py-1 ${hasChildren ? 'cursor-pointer' : ''}`}
        onClick={() => hasChildren && onToggle(item.id)}
      >
        {hasChildren && (
          <svg
            className={`w-4 h-4 transform transition-transform ${isExpanded ? 'rotate-90' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
          </svg>
        )}
        <span className="ml-2 text-gray-700">{item.label}</span>
        {item.badge && (
          <span className="ml-2 px-2 py-0.5 bg-blue-100 text-blue-800 rounded-full text-xs">
            {item.badge}
          </span>
        )}
      </div>
      {hasChildren && isExpanded && (
        <div className="ml-4 border-l border-gray-200 pl-4">
          {item.children?.map((child) => (
            <TreeItem
              key={child.id}
              item={child}
              isExpanded={expandedItems.includes(child.id)}
              onToggle={onToggle}
              expandedItems={expandedItems}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default TreeItem;
