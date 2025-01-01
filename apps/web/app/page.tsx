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

const Home: React.FC = () => {
  const [menuData, setMenuData] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMenu, setSelectedMenu] = useState<string>('');
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);

  useEffect(() => {
    fetchMenus();
  }, []);

  const fetchMenus = async () => {
    try {
      setLoading(true);
      const response = await menuApi.getAllMenus();
     
      setMenuData(response.data);
      console.log("menudata",response.data)
      if (response.data.length > 0) {
        setSelectedMenu(response.data[0].id);
        setExpandedItems([response.data[0].id]);
      }
    } catch  {
      toast.error('Failed to fetch menus');
    } finally {
      setLoading(false);
    }
  };
  const handleAddChild = async (parentId: string) => {
    try {
      const parent = findMenuItem(menuData, parentId);
      if (!parent) {
        console.error('Parent not found:', parentId);
        return;
      }
  
      console.log('Parent Data:', parent); // Log parent details
  
      const newItem = await menuApi.createMenuItem({
        name: 'New Item',
        depth: parent.depth + 1, // Child's depth is parent's depth + 1
        root_id: parent.root_id || parent.id, // Use parent's root_id or parent's ID
        parent_id: parent.id, // Set parent ID
      });
  
      console.log('New Item Response:', newItem.data); // Log new item data
  
      // Add the new child to the parent's children directly
      const updatedMenuData = menuData.map((item) =>
        item.id === parentId
          ? {
              ...item,
              children: [...(item.children || []), newItem.data], // Append the new child
            }
          : item
      );
  
      setMenuData(updatedMenuData); // Update state with the new menu structure
      toast.success('Item added successfully');
      setExpandedItems([...expandedItems, parentId]); // Expand the parent to show the new child
      setSelectedItem(newItem.data); // Select the newly created item
    } catch (error) {
      console.error('Error adding child:', error);
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
    } catch  {
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
    // toast.success('All items expanded');
  };

  const handleCollapseAll = () => {
    setExpandedItems([]);
    // toast.success('All items collapsed');
  };

  const handleToggle = (id: string) => {
    setExpandedItems(prev =>
      prev.includes(id) ? prev.filter(itemId => itemId !== id) : [...prev, id]
    );
    // toast.success(`Item ${prev.includes(id) ? 'collapsed' : 'expanded'}`);
  };

  const handleSelect = (id: string) => {
    const item = findMenuItem(menuData, id);
    setSelectedItem(item);
    // toast.success(`Item ${item ? 'selected' : 'deselected'}`);
  };

  return (
    <div className="overflow-x-auto h-screen flex flex-col bg-white">
      <Header title="Menu Management" />
      <TitleSection title="Menus" />
      <MenuDropdown
        selectedMenu={selectedMenu}
        onChange={setSelectedMenu}
        options={menuData?.map(item => ({
          value: item.id,
          label: item.name,
        }))}
      />
      <div className="flex mt-[300px] px-[48px] gap-8">
        <div className="w-[400px]">
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
        <Form
  selectedItem={selectedItem}
  onSave={handleUpdateItem}
  onCancel={() => setSelectedItem(null)}
/>;
      </div>
    </div>
  );
};

export default Home;