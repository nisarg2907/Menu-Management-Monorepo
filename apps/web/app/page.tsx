"use client"
import React, { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import Header from '../components/menu/Header';
import TitleSection from '../components/menu/TitleSection';
import MenuDropdown from '../components/menu/MenuDropdown';
import ExpandCollapseControls from '../components/menu/Controls';
import TreeView from '../components/menu/TreeView';
import Form from '../components/menu/Form';
import { MenuItem } from '../types';
import { menuApi, UpdateMenuData } from '../utils/api';
import useIsMobile from '../hooks/useMobile';

const Home: React.FC = () => {
  const [menuData, setMenuData] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMenu, setSelectedMenu] = useState<string>('');
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  
  const isMobile = useIsMobile();

  useEffect(() => {
    fetchMenus();
  }, []);

  const fetchMenus = async () => {
    try {
      setLoading(true);
      const response = await menuApi.getAllMenus();
      setMenuData(response.data);
      if (response.data.length > 0) {
        setSelectedMenu(response.data[0].id);
        setExpandedItems([response.data[0].id]);
      }
    } catch {
      toast.error('Failed to fetch menus');
    } finally {
      setLoading(false);
    }
  };

  const handleAddChild = async (parentId: string) => {
    try {
      const parent = findMenuItem(menuData, parentId);
      if (!parent) {
        return;
      }
      const newItem = await menuApi.createMenuItem({
        name: 'New Item',
        depth: parent.depth + 1,
        root_id: parent.root_id || parent.id,
        parent_id: parent.id,
      });
      const updatedMenuData = menuData.map((item) =>
        item.id === parentId
          ? {
              ...item,
              children: [...(item.children || []), newItem.data],
            }
          : item
      );
      setMenuData(updatedMenuData);
      toast.success('Item added successfully');
      setExpandedItems([...expandedItems, parentId]);
      setSelectedItem(newItem.data);
    } catch  {
      toast.error('Failed to add item');
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await menuApi.deleteMenuItem(id);
      await fetchMenus();
      toast.success('Item deleted successfully');
      setSelectedItem(null);
    } catch {
      toast.error('Failed to delete item');
    }
  };

  const handleUpdateItem = async (id: string, data: Partial<MenuItem>) => {
    try {
      const updateData: UpdateMenuData = {
        name: data?.name,
        depth: data.depth,
        order: data.order,
        root_id: data.root_id ?? undefined,
      };
      await menuApi.updateMenuItem(id, updateData);
      await fetchMenus();
      toast.success('Item updated successfully');
    } catch {
      toast.error('Failed to update item');
    }
  };

  const findMenuItem = (items: MenuItem[], id: string): MenuItem | null => {
    for (const item of items) {
      if (item.id === id) return item;
      if (item.children) {
        const found = findMenuItem(item.children, id);
        if (found) return found;
      }
    }
    return null;
  };

  const handleExpandAll = () => {
    const getAllItemIds = (items: MenuItem[]): string[] =>
      items.reduce<string[]>((acc, item) => 
        [...acc, item.id, ...(item.children ? getAllItemIds(item.children) : [])], []);
    setExpandedItems(getAllItemIds(menuData));
  };

  const handleCollapseAll = () => {
    setExpandedItems([]);
  };

  const handleToggle = (id: string) => {
    setExpandedItems(prev =>
      prev.includes(id) ? prev.filter(itemId => itemId !== id) : [...prev, id]
    );
  };

  const handleSelect = (id: string) => {
    const item = findMenuItem(menuData, id);
    setSelectedItem(item);
  };

  return (
    <div className="flex h-screen bg-white">
      <div className="flex-1 flex mt-6 flex-col overflow-hidden">
        <div className=" bg-white">
          <Header title="Menu Management" />
          <TitleSection title="Menus" />
          <div className="w-full max-w-xs">
            <MenuDropdown
              selectedMenu={selectedMenu}
              onChange={setSelectedMenu}
              options={menuData?.map(item => ({
                value: item.id,
                label: item.name,
              }))}
            />
          </div>
        </div>

        {/* Main content with tree and form */}
        <div className={`flex ${isMobile ? 'flex-col' : 'flex-row'} flex-1 overflow-hidden p-6 space-x-6`}>
          {/* Left side - Tree view */}
          <div className={`${isMobile ? 'w-full' : 'w-1/2 max-w-md'} bg-white rounded-lg p-4 overflow-auto`}>
            <ExpandCollapseControls
              onExpandAll={handleExpandAll}
              onCollapseAll={handleCollapseAll}
            />
            {loading ? (
              <div className="flex justify-center items-center h-40">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
              </div>
            ) : (
              <TreeView
                items={menuData}
                expandedItems={expandedItems}
                onToggle={handleToggle}
                onAddChild={handleAddChild}
                onDelete={handleDelete}
                onSelect={handleSelect}
                selectedId={selectedItem?.id || null}
              />
            )}
          </div>

          {/* Right side - Form */}
          <div className={`${isMobile ? 'w-full mt-6' : 'w-1/2'} bg-white rounded-lg p-4 overflow-auto`}>
            {selectedItem ? (
              <Form
                selectedItem={selectedItem}
                onSave={handleUpdateItem}
                onCancel={() => setSelectedItem(null)}
              />
            ) : (
              <div className="flex items-center justify-center h-full text-gray-500">
                Select an item to edit
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;