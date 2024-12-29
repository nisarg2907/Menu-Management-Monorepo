export type MenuItem = {
    id: string;
    label: string;
    badge?: string;
    children?: MenuItem[];
    depth: number;
  };
  
  export type TreeItemProps = {
    item: MenuItem;
    isExpanded: boolean;
    onToggle: (id: string) => void;
    expandedItems: string[];
  };
  
  export type TreeViewProps = {
    items: MenuItem[];
    expandedItems: string[];
    onToggle: (id: string) => void;
  };
  