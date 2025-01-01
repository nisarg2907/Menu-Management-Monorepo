import React from 'react';
import Image from 'next/image';
import BlueMenuIcon from '../../assets/blueMenu.svg';

interface TitleSectionProps {
  title: string;
  icon?: string;
}

const TitleSection: React.FC<TitleSectionProps> = ({ 
  title, 
  icon = BlueMenuIcon 
}) => {
  return (
    <div className="w-full px-10 py-4">
      <div className="flex items-center gap-4">
        <Image src={icon} alt="Section Icon" className="w-[52px] h-[52px]" />
        <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
      </div>
    </div>
  );
};

export default TitleSection;