// types/index.ts
export interface MenuItem {
  id: string;
  name: string;
  depth: number;
  order: number;
  root_id: string | null;
  parent_id:string | null;
  menu_id: string | null;
  children?: MenuItem[];
  badge?: string;
  label?: string; // For backward compatibility
}

export interface TreeViewProps {
  items: MenuItem[];
  expandedItems: string[];
  onToggle: (id: string) => void;
  onAddChild: (parentId: string) => void;
  onDelete: (id: string) => void;
  onSelect: (id: string) => void;
  selectedId: string | null;
}

export interface TreeItemProps {
  item: MenuItem;
  isExpanded: boolean;
  onToggle: (id: string) => void;
  expandedItems: string[];
  onAddChild: (parentId: string) => void;
  onDelete: (id: string) => void;
  onSelect: (id: string) => void;
  isSelected: boolean;
}