import React from 'react';

type MenuDropdownProps = {
  selectedMenu: string;
  onChange: (value: string) => void;
};

const MenuDropdown: React.FC<MenuDropdownProps> = ({ selectedMenu, onChange }) => {
  return (
    <div className="fixed w-[349px] h-[74px] top-[204px] left-[312px] gap-[8px] opacity-100 flex flex-col">
      <span className="text-sm text-gray-600">menu</span>
      <div className="relative w-full">
        <select
          value={selectedMenu}
          onChange={(e) => onChange(e.target.value)}
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
  );
};

export default MenuDropdown;
