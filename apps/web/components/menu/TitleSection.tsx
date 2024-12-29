import React from 'react';
import Image from 'next/image';
import BlueMenuIcon from '../../assets/blueMenu.svg';

const TitleSection: React.FC = () => {
  return (
    <div className="fixed w-[1176px] h-[84px] top-[108px] left-[264px] p-[16px_48px] gap-[0px] flex justify-between opacity-100">
      <div className="flex w-full h-[52px] gap-[16px] opacity-100">
        <Image src={BlueMenuIcon} alt="Blue Menu Icon" />
        <span className="text-[#101828] font-sans font-extrabold text-[32px] leading-[40px] tracking-[-0.04em]">
          Menus
        </span>
      </div>
    </div>
  );
};

export default TitleSection;
