import React from 'react';
import Image from 'next/image';
import MenuIcon from '../../assets/folder-main.svg';

const Header: React.FC = () => {
  return (
    <header className=" fixed w-[1176px] h-[84px] top-[24px] left-[264px] p-[16px_48px] gap-[0px] flex justify-between opacity-100">
      <div className="flex items-center gap-[8px] rounded-[8px] opacity-100">
        <Image src={MenuIcon} alt="Menu Icon" />
        <span className="text-gray-300">/</span>
        <span className="text-black font-sans">Menus</span>
      </div>
    </header>
  );
};

export default Header;
