import React from 'react';
import Image from 'next/image';
import FolderIcon from '../../assets/folder.svg';

type MenuItemProps = {
  label: string;
  isOpen?: boolean;
  onClick: () => void;
};

const MenuItem: React.FC<MenuItemProps> = ({ label, isOpen = false, onClick }) => {
  return (
    <div className={`flex flex-col  ml-1 rounded-lg`}>
      <button onClick={onClick} className="w-full h-full flex items-center gap-2 p-2">
        <Image src={FolderIcon} alt="Menu" />
        <span className="ml-2 text-sm font-sans text-white">{label}</span>
      </button>
    </div>
  );
};

export default MenuItem;
