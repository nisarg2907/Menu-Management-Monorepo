"use client"
import React, { useState } from 'react';
import Header from '../components/menu/Header';
import TitleSection from '../components/menu/TitleSection';
import MenuDropdown from '../components/menu/MenuDropdown';
import ExpandCollapseControls from '../components/menu/Controls';
import TreeView from '../components/menu/TreeView';
import Form from '../components/menu/Form';
import { MenuItem } from '../types';

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
        ],
      },
    ],
  },
];

const Home: React.FC = () => {
  const [selectedMenu, setSelectedMenu] = useState<string>('systemmanagement');
  const [expandedItems, setExpandedItems] = useState<string[]>(['systemmanagement']);

const handleExpandAll = () => {
  const getAllItemIds = (items: MenuItem[]): string[] =>
    items?.reduce<string[]>((acc, item) => [...acc, item.id, ...(item.children ? getAllItemIds(item.children) : [])], []);
  setExpandedItems(getAllItemIds(menuData));
};

  const handleCollapseAll = () => {
    setExpandedItems([]);
  };

  const handleToggle = (id: string) => {
    setExpandedItems((prev) =>
      prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id]
    );
  };

  const getSelectedItemDetails = (items: MenuItem[], id: string): MenuItem | null => {
    for (const item of items) {
      if (item.id === id) return item;
      if (item.children) {
        const found = getSelectedItemDetails(item.children, id);
        if (found) return found;
      }
    }
    return null;
  };

  const selectedItem = getSelectedItemDetails(menuData, selectedMenu);

  return (
    <div className="overflow-x-auto h-screen flex flex-col bg-white">
      <Header />
      <TitleSection />
      <MenuDropdown selectedMenu={selectedMenu} onChange={setSelectedMenu} />
      <div className="flex mt-[300px] px-[48px] gap-8">
        <div className="w-[400px]">
          <ExpandCollapseControls onExpandAll={handleExpandAll} onCollapseAll={handleCollapseAll} />
          <TreeView items={menuData} expandedItems={expandedItems} onToggle={handleToggle} />
        </div>
        <Form selectedItem={selectedItem} />
      </div>
    </div>
  );
};

export default Home;
