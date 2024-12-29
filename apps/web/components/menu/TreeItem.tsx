import React from 'react';
import { TreeItemProps } from '../../types';
import { PlusCircle, Trash2 } from 'lucide-react';

const TreeItem: React.FC<TreeItemProps> = ({
  item,
  isExpanded,
  onToggle,
  expandedItems,
  onAddChild,
  onDelete,
  onSelect,
  isSelected,
}) => {
  const hasChildren = item.children && item.children.length > 0;

  return (
    <div className="relative">
      <div
        className={`flex items-center py-1 group ${hasChildren ? 'cursor-pointer' : ''} ${
          isSelected ? 'bg-blue-50' : ''
        }`}
        onClick={() => onSelect(item.id)}
      >
        <div className="flex items-center flex-1">
          {hasChildren && (
            <svg
              className={`w-4 h-4 transform transition-transform ${isExpanded ? 'rotate-90' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              onClick={(e) => {
                e.stopPropagation();
                onToggle(item.id);
              }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          )}
          <span className="ml-2 text-gray-700">{item.name}</span>
          {item.badge && (
            <span className="ml-2 px-2 py-0.5 bg-blue-100 text-blue-800 rounded-full text-xs">
              {item.badge}
            </span>
          )}
        </div>
        
        <div className="opacity-0 group-hover:opacity-100 flex items-center gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onAddChild(item.id);
            }}
            className="p-1 hover:bg-blue-100 rounded"
          >
            <PlusCircle className="w-4 h-4 text-blue-600" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete(item.id);
            }}
            className="p-1 hover:bg-red-100 rounded"
          >
            <Trash2 className="w-4 h-4 text-red-600" />
          </button>
        </div>
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
              onAddChild={onAddChild}
              onDelete={onDelete}
              onSelect={onSelect}
              isSelected={isSelected}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default TreeItem;