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
    <div className="w-full px-10">
      <label className="block text-sm text-gray-600 mb-2">{label}</label>
      <div className="relative w-full max-w-[300px]"> 
        <select
          value={selectedMenu}
          onChange={(e) => onChange(e.target.value)}
          className="relative w-full h-13 px-4 py-3 rounded-lg bg-gray-100 border border-gray-200 appearance-none text-gray-900"
          style={{ maxWidth: "400px" }}
        >
          {options?.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default MenuDropdown;
