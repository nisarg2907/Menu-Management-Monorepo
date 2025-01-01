import React from 'react';
import Image from 'next/image';
import SubmenuItemLogo from '../../assets/submenuItemLogo.svg';
import SelectedSubMenuItem from '../../assets/selectedSubmenuItem.svg'
type SubMenuItemProps = {
  label: string;
  isSelected: boolean;
  onClick: () => void;
};

const SubMenuItem: React.FC<SubMenuItemProps> = ({ label, isSelected, onClick }) => {
  return (
    <div
      className={`flex items-center px-4 py-2 font-sans text-sm font-medium rounded-lg ${
        isSelected ? 'bg-[#9FF443] text-[#101828] font-[700]' : 'text-[#667085] hover:bg-gray-200'
      }`}
      style={{
        width: '100%',
        height: '100%',
        gap: '12px',
      }}
      onClick={onClick}
    >
      {/* Icon */}
      <Image src={isSelected ? SelectedSubMenuItem : SubmenuItemLogo} alt="SubMenu" width={16} height={16} />

      {/* Label */}
      <span className="ml-2">{label}</span>
    </div>
  );
};

export default SubMenuItem;
