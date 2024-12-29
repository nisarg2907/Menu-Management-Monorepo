import React from 'react';
import SidebarHeader from './sidebar/SidebarHeader';
import SidebarBody from './sidebar/SidebarBody';
import SidebarFooter from './sidebar/SidebarFooter';
import { useSidebar } from '../context/SidebarContext';
import ToggleSvg from '../assets/menu_open.svg';
import Image from 'next/image';
const Sidebar: React.FC = () => {
  const { isSidebarOpen, toggleSidebar } = useSidebar();

  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.key === 'b') {
        toggleSidebar();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [toggleSidebar]);

  const [openSections, setOpenSections] = React.useState<{ [key: string]: boolean }>({
    systems: false,
    usersGroups: false,
  });
  const [selectedSubMenu, setSelectedSubMenu] = React.useState<string>('');

  const toggleSection = (section: string) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  return (
    <div
      className={`transition-all m-4 duration-300 ${
        isSidebarOpen ? 'w-[240px]' : 'w-0'
      } bg-[#101828]  max-h-screen  top-0 left-0 rounded-lg overflow-hidden`}
    >
      {isSidebarOpen && (
        <>
          <SidebarHeader />
          <SidebarBody
            openSections={openSections}
            toggleSection={toggleSection}
            selectedSubMenu={selectedSubMenu}
            setSelectedSubMenu={setSelectedSubMenu}
          />
          <SidebarFooter />
        </>
      )}
      {!isSidebarOpen && (
        <button
          onClick={toggleSidebar}
          className="absolute top-0 left-0 bg-white p-4 ml-4 mt-4"
        >
          <Image src={ToggleSvg} alt="toggle" />
        </button>
      )}
    </div>
  );
};

export default Sidebar;

