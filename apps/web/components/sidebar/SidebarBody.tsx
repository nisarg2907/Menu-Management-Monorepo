import React from 'react';
import MenuSection from './MenuSection';

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
  const sections = [
    {
      label: 'Systems',
      subMenuItems: [
        'System Code',
        'Properties',
        'Menus',
        'API List',
      ],
    },
    {
      label: 'Users & Groups',
      subMenuItems: [
        'Users',
        'User Account Registration',
        'Groups',
        'User Group Registration',
      ],
    },
  ];

  return (
    <div className="flex flex-col mt-8 space-y-1 gap-2 m-4 rounded-lg">
      {sections?.map((section) => (
        <MenuSection
          key={section.label}
          label={section.label}
          isOpen={openSections[section.label] as boolean}
          toggleSection={() => toggleSection(section.label)}
          subMenuItems={section.subMenuItems?.map((subMenuLabel) => ({
            label: subMenuLabel,
            isSelected: selectedSubMenu === subMenuLabel,
            onClick: () => setSelectedSubMenu(subMenuLabel),
          }))}
        />
      ))}

      <MenuSection
        label="Competition"
        isOpen={false}
        toggleSection={() => {}}
        subMenuItems={[]}
      />
    </div>
  );
};

export default SidebarBody;
