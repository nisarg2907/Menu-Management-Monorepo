import React, { useState } from 'react';
import { TreeItemProps } from '../../types';
import { Trash2 } from 'lucide-react';
import AddIcon from '../../assets/AddIcon.svg';
import Image from 'next/image';
import Modal from '../ui/Modal';

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
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const hasChildren = item.children && item.children.length > 0;

  const handleAddChild = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsAddModalOpen(true);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsDeleteModalOpen(true);
  };

  const confirmAddChild = () => {
    onAddChild(item.id);
    setIsAddModalOpen(false);
  };

  const confirmDelete = () => {
    onDelete(item.id);
    setIsDeleteModalOpen(false);
  };

  return (
    <div className="relative">
      <div
        className={`flex items-center py-2 pl-${item.depth * 4} group ${
          isSelected ? 'bg-blue-100 rounded-md' : ''
        }`}
        onClick={() => onSelect(item.id)}
      >
        <div className="flex items-center flex-1">
          {hasChildren && (
            <svg
              className={`w-4 h-4 mr-2 transform transition-transform ${
                isExpanded ? 'rotate-90' : ''
              }`}
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
          <span className="text-gray-700 font-medium flex items-center gap-2">
            {item?.name}
            {item.depth > 0 && (
              <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={handleAddChild}
                  className="p-1 hover:bg-blue-100 rounded"
                >
                  <Image src={AddIcon} alt="Add" />
                </button>
                <button
                  onClick={handleDelete}
                  className="p-1 hover:bg-red-100 rounded"
                >
                  <Trash2 className="w-4 h-4 text-red-600" />
                </button>
              </div>
            )}
          </span>
        </div>
      </div>
      {hasChildren && isExpanded && (
        <div className="ml-6 border-l border-gray-300">
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
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Add Child"
      >
        <div className="flex justify-end gap-4">
          <button
            onClick={confirmAddChild}
            className="py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Confirm
          </button>
          <button
            onClick={() => setIsAddModalOpen(false)}
            className="py-2 px-4 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Cancel
          </button>
        </div>
      </Modal>
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Delete Item"
      >
        <div className="flex justify-end gap-4">
          <button
            onClick={confirmDelete}
            className="py-2 px-4 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Confirm
          </button>
          <button
            onClick={() => setIsDeleteModalOpen(false)}
            className="py-2 px-4 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Cancel
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default TreeItem;
