import React from 'react';
import { TreeViewProps } from '../../types';
import TreeItem from './TreeItem';

const TreeView: React.FC<TreeViewProps> = ({
  items,
  expandedItems,
  onToggle,
  onAddChild,
  onDelete,
  onSelect,
  selectedId
}) => {
  return (
    <div className="tree-view">
      {items?.map((item) => (
        <TreeItem
          key={item.id}
          item={item}
          isExpanded={expandedItems.includes(item.id)}
          onToggle={onToggle}
          expandedItems={expandedItems}
          onAddChild={onAddChild}
          onDelete={onDelete}
          onSelect={onSelect}
          isSelected={selectedId === item.id}
        />
      ))}
    </div>
  );
};

export default TreeView;