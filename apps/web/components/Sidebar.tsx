import React from 'react';
import SidebarHeader from './sidebar/SidebarHeader';
import SidebarBody from './sidebar/SidebarBody';
import SidebarFooter from './sidebar/SidebarFooter';
import { useSidebar } from '../context/SidebarContext';
import OpenSidebar from '../assets/menu_open.svg'
import Image from 'next/image';
import useIsMobile from '../hooks/useMobile';

const Sidebar: React.FC = () => {
  const { isSidebarOpen, toggleSidebar } = useSidebar();
  const isMobile = useIsMobile();

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

  const sidebarWidth = isSidebarOpen 
    ? isMobile ? 'w-[180px]' : 'w-[240px]' // Smaller width on mobile
    : 'w-12';

  return (
    <>
      {/* Backdrop - only visible on mobile when sidebar is open */}
      {isSidebarOpen && isMobile && (
        <div 
          className="fixed inset-0 bg-white z-40" 
          onClick={toggleSidebar}
        />
      )}
      
      {/* Sidebar */}
      <div
        className={`fixed md:relative transition-all duration-300 z-50  mb-8
          ${sidebarWidth}
          bg-[#101828] h-full max-h-full top-0 left-0 rounded-lg`}
      >
        {isSidebarOpen ? (
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
        ) : (
          <div className="bg-white h-full max-h-full flex flex-col items-center">
            <button
              onClick={toggleSidebar}
              className="w-full h-12 flex items-center justify-center bg-white"
            >
              <Image src={OpenSidebar} alt="toggle" width={24} height={24} />
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default Sidebar;