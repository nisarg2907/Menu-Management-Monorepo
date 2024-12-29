import React from 'react';

interface MenuOption {
  value: string;
  label: string;
}

interface MenuDropdownProps {
  selectedMenu: string;
  onChange: (value: string) => void;
  options: MenuOption[];
  label?: string;
}

const MenuDropdown: React.FC<MenuDropdownProps> = ({ 
  selectedMenu, 
  onChange, 
  options,
  label = "menu" 
}) => {
  return (
    <div className="fixed w-[349px] h-[74px]  top-[204px] left-[312px] gap-[8px] opacity-100 flex flex-col">
      <span className="text-sm text-gray-600">{label}</span>
      <div className="relative  w-full">
        <select
          value={selectedMenu}
          onChange={(e) => onChange(e.target.value)}
          className="w-full h-[52px] p-[14px_16px] rounded-[8px] bg-gray-100 border border-gray-300 appearance-none"
        >
          {options?.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default MenuDropdown;