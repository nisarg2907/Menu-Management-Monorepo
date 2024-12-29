import React from 'react';
import { TreeViewProps} from '../../types'
import TreeItem from './TreeItem';

const TreeView: React.FC<TreeViewProps> = ({ items, expandedItems, onToggle }) => {
  return (
    <div className="tree-view pl-4">
      {items.map((item) => (
        <TreeItem
          key={item.id}
          item={item}
          isExpanded={expandedItems.includes(item.id)}
          onToggle={onToggle}
          expandedItems={expandedItems}
        />
      ))}
    </div>
  );
};

export default TreeView;
