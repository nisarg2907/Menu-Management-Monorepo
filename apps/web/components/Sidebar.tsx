import React from 'react';
import Image from 'next/image';
import LogoSvg from '../assets/logoSvg.svg';
import ToggleSvg from '../assets/toggleSvg.svg';
import SubmenuItemLogo from '../assets/submenuItemLogo.svg';
import FolderIcon from '../assets/folder.svg';

type MenuItemProps = {
  label: string;
  isOpen?: boolean;
  onClick: () => void;
};

const MenuItem: React.FC<MenuItemProps> = ({ label, isOpen = false, onClick }) => {
  return (
    <div className={`flex flex-col  rounded-lg`}>
      <button onClick={onClick} className="w-full h-full flex items-center p-2">
        <Image src={FolderIcon} alt="Menu" />
        <span className="ml-2 text-sm text-white">{label}</span>
      </button>
    </div>
  );
};

type SubMenuItemProps = {
  label: string;
  isSelected: boolean;
  onClick: () => void;
};

const SubMenuItem: React.FC<SubMenuItemProps> = ({ label, isSelected, onClick }) => {
  return (
    <div
      className={`flex items-center py-2 pl-3 text-sm rounded-lg ${
        isSelected ? 'bg-[#9FF443] text-black' : 'text-[#667085]'
      }`}
      style={{
        width: '208px',
        height: '48px',
        padding: '12px 0 0 0',
        gap: '16px',
        borderRadius: '16px 0 0 0',
        opacity: isSelected ? 1 : 1,
      }}
      onClick={onClick}
    >
      <Image src={SubmenuItemLogo} alt="SubMenu" width={16} height={16} />
      <span className="ml-2">{label}</span>
    </div>
  );
};

const SidebarHeader: React.FC = () => {
  return (
    <div className="flex items-center justify-between p-[30px] w-[240px] h-[84px] gap-[0px] opacity-[1]">
      <Image src={LogoSvg} alt="logo" />
      <Image src={ToggleSvg} alt="toggle" />
    </div>
  );
};

type SidebarBodyProps = {
  openSections: { [key: string]: boolean };
  toggleSection: (section: string) => void;
  selectedSubMenu: string;
  setSelectedSubMenu: (label: string) => void;
};

const SidebarBody: React.FC<SidebarBodyProps> = ({
  openSections,
  toggleSection,
  selectedSubMenu,
  setSelectedSubMenu,
}) => {
  return (
    <div className="flex flex-col mt-8 space-y-1 gap-2 m-4 rounded-lg">
      {/* Systems */}
      <div
        className={`rounded-lg ${
          openSections.systems ? 'bg-[#1E293B] text-white' : ''
        }`}
      >
        <MenuItem
          label="Systems"
          isOpen={openSections.systems}
          onClick={() => toggleSection('systems')}
        />
        {openSections.systems && (
          <div className="space-y-1">
            <SubMenuItem
              label="System Code"
              isSelected={selectedSubMenu === 'System Code'}
              onClick={() => setSelectedSubMenu('System Code')}
            />
            <SubMenuItem
              label="Properties"
              isSelected={selectedSubMenu === 'Properties'}
              onClick={() => setSelectedSubMenu('Properties')}
            />
            <SubMenuItem
              label="Menus"
              isSelected={selectedSubMenu === 'Menus'}
              onClick={() => setSelectedSubMenu('Menus')}
            />
            <SubMenuItem
              label="API List"
              isSelected={selectedSubMenu === 'API List'}
              onClick={() => setSelectedSubMenu('API List')}
            />
          </div>
        )}
      </div>

      {/* Users & Groups */}
      <div
        className={`rounded-lg ${
          openSections.usersGroups ? 'bg-[#1E293B] text-white' : ''
        }`}
      >
        <MenuItem
          label="Users & Groups"
          isOpen={openSections.usersGroups}
          onClick={() => toggleSection('usersGroups')}
        />
        {openSections.usersGroups && (
          <div className="space-y-1">
            <SubMenuItem
              label="Users"
              isSelected={selectedSubMenu === 'Users'}
              onClick={() => setSelectedSubMenu('Users')}
            />
            <SubMenuItem
              label="User Account Registration"
              isSelected={selectedSubMenu === 'User Account Registration'}
              onClick={() => setSelectedSubMenu('User Account Registration')}
            />
            <SubMenuItem
              label="Groups"
              isSelected={selectedSubMenu === 'Groups'}
              onClick={() => setSelectedSubMenu('Groups')}
            />
            <SubMenuItem
              label="User Group Registration"
              isSelected={selectedSubMenu === 'User Group Registration'}
              onClick={() => setSelectedSubMenu('User Group Registration')}
            />
          </div>
        )}
      </div>

      {/* Competition */}
      <MenuItem label="Competition" onClick={() => {}} />
    </div>
  );
};

const SidebarFooter: React.FC = () => {
  return <div className="p-4">{/* Add any footer content here */}</div>;
};

const Sidebar: React.FC = () => {
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
    <aside className="w-[240px] bg-[#101828] max-h-screen  rounded-lg">
      <SidebarHeader />
      <SidebarBody
        openSections={openSections}
        toggleSection={toggleSection}
        selectedSubMenu={selectedSubMenu}
        setSelectedSubMenu={setSelectedSubMenu}
      />
      <SidebarFooter />
    </aside>
  );
};

export default Sidebar;
