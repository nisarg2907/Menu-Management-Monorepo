import React from 'react';
import MenuItem from './MenuItem';
import SubMenuItem from './SubMenuItem';

type MenuSectionProps = {
  label: string;
  isOpen: boolean;
  toggleSection: () => void;
  subMenuItems: { label: string; isSelected: boolean; onClick: () => void }[];
};

const MenuSection: React.FC<MenuSectionProps> = ({ label, isOpen, toggleSection, subMenuItems }) => {
  return (
    <div className={`rounded-lg ${isOpen ? 'bg-[#1E293B] text-white' : ''}`}>
      <MenuItem label={label} isOpen={isOpen} onClick={toggleSection} />
      {isOpen && (
        <div className="space-y-1 p-0">
          {subMenuItems?.map((item, index) => (
            <SubMenuItem
              key={index}
              label={item.label}
              isSelected={item.isSelected}
              onClick={item.onClick}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default MenuSection;
