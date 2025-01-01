import React from 'react';
import Image from 'next/image';
import MenuIcon from '../../assets/folder-main.svg';

interface HeaderProps {
  title: string;
  path?: string;
}

const Header: React.FC<HeaderProps> = ({ title, path = "Menus" }) => {
  return (
    <header className="w-full px-10 py-4 flex items-center">
      <div className="flex items-center gap-2">
        <Image src={MenuIcon} alt="Menu Icon" className="w-5 h-5" />
        <span className="text-gray-300">/</span>
        <span className="text-gray-600 text-sm">{path}</span>
      </div>
    </header>
  );
};

export default Header;