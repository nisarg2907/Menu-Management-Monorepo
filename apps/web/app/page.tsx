"use client"
import React, { useState } from 'react';
import Image from 'next/image';
import MenuIcon from '../assets/folder-main.svg';
import BlueMenuIcon from '../assets/blueMenu.svg';

type MenuItem = {
  id: string;
  label: string;
  badge?: string;
  children?: MenuItem[];
  depth: number;
};

type TreeItemProps = {
  item: MenuItem;
  isExpanded: boolean;
  onToggle: (id: string) => void;
  expandedItems: string[];
  parentId?: string;
};

type TreeViewProps = {
  items: MenuItem[];
  expandedItems: string[];
  onToggle: (id: string) => void;
};

// Sample menu data
const menuData: MenuItem[] = [
  {
    id: 'systemmanagement',
    label: 'systemmanagement',
    depth: 0,
    children: [
      {
        id: 'system-management',
        label: 'SystemManagement',
        depth: 1,
        children: [
          {
            id: 'systems',
            label: 'Systems',
            depth: 2,
            children: [
              {
                id: 'system-code',
                label: 'SystemCode',
                badge: '1',
                depth: 3,
                children: [
                  {
                    id: 'code-registration',
                    label: 'Code Registration',
                    depth: 4,
                  },
                ],
              },
            ],
          },
          {
            id: 'properties',
            label: 'Properties',
            depth: 2,
          },
          {
            id: 'menus',
            label: 'Menus',
            depth: 2,
            children: [
              {
                id: 'menu-registration',
                label: 'Menu Registration',
                depth: 3,
              },
            ],
          },
          {
            id: 'api-list',
            label: 'API List',
            depth: 2,
            children: [
              {
                id: 'api-registration',
                label: 'API Registration',
                depth: 3,
              },
              {
                id: 'api-edit',
                label: 'API Edit',
                depth: 3,
              },
            ],
          },
        ],
      },
    ],
  },
];

// TreeItem Component
const TreeItem: React.FC<TreeItemProps> = ({ 
  item, 
  isExpanded, 
  onToggle, 
  expandedItems,
  // parentId 
}) => {
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
          {item?.children?.map((child) => (
            <TreeItem
              key={child.id}
              item={child}
              isExpanded={expandedItems.includes(child.id)}
              onToggle={onToggle}
              expandedItems={expandedItems}
              parentId={item.id}
            />
          ))}
        </div>
      )}
    </div>
  );
};

// TreeView Component
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

// Helper function to get all item IDs recursively
const getAllItemIds = (items: MenuItem[]): string[] => {
  let ids: string[] = [];
  items.forEach(item => {
    ids.push(item.id);
    if (item.children && item.children.length > 0) {
      ids = [...ids, ...getAllItemIds(item.children)];
    }
  });
  return ids;
};

// Helper function to get parent hierarchy
const getParentHierarchy = (items: MenuItem[], targetId: string, path: string[] = []): string[] | null => {
  for (const item of items) {
    if (item.id === targetId) {
      return [...path, item.id];
    }
    if (item.children) {
      const foundPath = getParentHierarchy(item.children, targetId, [...path, item.id]);
      if (foundPath) {
        return foundPath;
      }
    }
  }
  return null;
};

const Home: React.FC = () => {
  const [selectedMenu, setSelectedMenu] = useState<string>('systemmanagement');
  const [expandedItems, setExpandedItems] = useState<string[]>(['systemmanagement']);

  // Handle expand/collapse all
  const handleExpandAll = () => {
    const allIds = getAllItemIds(menuData);
    setExpandedItems(allIds);
  };

  const handleCollapseAll = () => {
    setExpandedItems([]);
  };

  // Handle individual item toggle with parent hierarchy
  const handleToggle = (id: string) => {
    setExpandedItems(prev => {
      if (prev.includes(id)) {
        // When collapsing, remove the item and all its children
        const allIds = getAllItemIds(menuData);
        const childrenIds = allIds.filter(itemId => {
          const parentPath = getParentHierarchy(menuData, itemId);
          return parentPath?.includes(id) && itemId !== id;
        });
        return prev.filter(itemId => !childrenIds.includes(itemId) && itemId !== id);
      } else {
        // When expanding, add the item and its parent hierarchy
        const parentPath = getParentHierarchy(menuData, id);
        return parentPath ? [...new Set([...prev, ...parentPath])] : [...prev, id];
      }
    });
  };

  // Selected item details for the form
  const getSelectedItemDetails = (items: MenuItem[]): MenuItem | null => {
    for (const item of items) {
      if (item.id === selectedMenu) return item;
      if (item.children) {
        const found = getSelectedItemDetails(item.children);
        if (found) return found;
      }
    }
    return null;
  };

  const selectedItem = getSelectedItemDetails(menuData);

  return (
    <div className="overflow-x-auto h-screen flex items-start justify-center bg-white">
      {/* Header with Menu Icon and Path */}
      <header className="fixed w-[1176px] h-[84px] top-[24px] left-[264px] p-[16px_48px] gap-[0px] flex justify-between opacity-100">
        <div className="flex items-center gap-[8px] rounded-[8px] opacity-100">
          <Image src={MenuIcon} alt="Menu Icon" />
          <span className="text-gray-300">/</span>
          <span className="text-black font-sans">Menus</span>
        </div>
      </header>

      {/* Title Section with Blue Menu Icon */}
      <div className="fixed w-[1176px] h-[84px] top-[108px] left-[264px] p-[16px_48px] gap-[0px] flex justify-between opacity-100">
        <div className="flex w-full h-[52px] gap-[16px] opacity-100">
          <Image src={BlueMenuIcon} alt="Blue Menu Icon" />
          <span className="text-[#101828] font-sans font-extrabold text-[32px] leading-[40px] tracking-[-0.04em]">
            Menus
          </span>
        </div>
      </div>

      {/* Menu Dropdown Section */}
      <div className="fixed w-[349px] h-[74px] top-[204px] left-[312px] gap-[8px] opacity-100 flex flex-col">
        <span className="text-sm text-gray-600">menu</span>
        <div className="relative w-full">
          <select
            value={selectedMenu}
            onChange={(e) => setSelectedMenu(e.target.value)}
            className="w-full h-[52px] p-[14px_16px] rounded-[8px] border border-gray-200 bg-white appearance-none"
          >
            <option value="systemmanagement">systemmanagement</option>
          </select>
          <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="fixed w-[800px] top-[300px] left-[312px] flex gap-[48px]">
        {/* Left Side - Tree Structure */}
        <div className="w-[400px]">
          <div className="flex gap-4 mb-6">
            <button 
              onClick={handleExpandAll}
              className="px-4 py-2 bg-gray-900 text-white rounded-lg text-sm hover:bg-gray-800 transition-colors"
            >
              Expand All
            </button>
            <button 
              onClick={handleCollapseAll}
              className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg text-sm hover:bg-gray-50 transition-colors"
            >
              Collapse All
            </button>
          </div>
          
          <TreeView
            items={menuData}
            expandedItems={expandedItems}
            onToggle={handleToggle}
          />
        </div>

        {/* Right Side - Form */}
        <div className="w-[350px] bg-white p-6 rounded-lg">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Menu ID
              </label>
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded-lg bg-gray-50"
                value={selectedItem?.id || ''}
                disabled
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Depth
              </label>
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded-lg bg-gray-50"
                value={selectedItem?.depth.toString() || ''}
                disabled
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Parent Data
              </label>
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded-lg bg-gray-50"
                value="Systems"
                disabled
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Name
              </label>
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded-lg"
                value={selectedItem?.label || ''}
                onChange={() => {
                  // Handle name change
                }}
              />
            </div>

            <button className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;