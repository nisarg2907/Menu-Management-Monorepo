import React from 'react';
import Image from 'next/image';
import LogoSvg from '../../assets/logoSvg.svg';
import ToggleSvg from '../../assets/toggleSvg.svg';
import { useSidebar } from '../../context/SidebarContext';

const SidebarHeader: React.FC = () => {
  const { toggleSidebar } = useSidebar();

  return (
    <div className="flex items-center justify-between p-[30px] w-full h-[84px] gap-[0px] opacity-[1]">
      <Image src={LogoSvg} alt="logo" />
      <button onClick={toggleSidebar}>
        <Image src={ToggleSvg} alt="toggle" />
      </button>
    </div>
  );
};

export default SidebarHeader;
