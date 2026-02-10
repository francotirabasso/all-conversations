import React, { useState } from 'react';
import { 
  Rocket, 
  User, 
  Settings, 
  Activity, 
  History, 
  TrendingUp, 
  Video, 
  HelpCircle,
  ChevronDown,
  Plus
} from 'lucide-react';
import svgPaths from '../../imports/svg-uoglwwvkom';
import svgPathsAiNotes from '../../imports/svg-rqs6u8vuff';
import svgPathsDialpadStar from '../../imports/svg-gfstlbjct3';
import DialpadLogo from '../../imports/DialpadLogo';
import imgPic from 'figma:asset/76274627fd447d4009110cb8d0e70426b2e88508.png';
import { useSidebar } from '../contexts/SidebarContext';

function AiNotesIcon() {
  return (
    <svg className="size-[20px]" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
      <g>
        <path d={svgPathsAiNotes.p3f96d400} fill="#1C1C1C" />
      </g>
    </svg>
  );
}

function DialpadStarIcon() {
  return (
    <svg className="size-[20px]" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
      <g clipPath="url(#clip0_2055_129057)">
        <path clipRule="evenodd" d={svgPathsDialpadStar.p320fa200} fill="#1C1C1C" fillRule="evenodd" />
      </g>
      <defs>
        <clipPath id="clip0_2055_129057">
          <rect fill="white" height="20" width="20" />
        </clipPath>
      </defs>
    </svg>
  );
}

interface NavIconProps {
  icon: React.ReactNode;
  active?: boolean;
  onClick?: () => void;
}

function NavIcon({ icon, active = false, onClick }: NavIconProps) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center justify-center p-[8px] rounded-[40px] shrink-0 transition-colors ${
        active ? 'bg-[rgba(28,28,28,0.14)]' : 'hover:bg-[rgba(28,28,28,0.06)]'
      }`}
    >
      {icon}
    </button>
  );
}

function MainNavigation() {
  const [activeNav, setActiveNav] = useState('analytics');

  return (
    <div className="bg-[#f9f9f9] w-[52px] h-full flex flex-col items-center justify-between px-[8px] py-[16px] relative border-r border-[rgba(28,28,28,0.11)]">
      {/* Top Section */}
      <div className="flex flex-col gap-[32px] items-center">
        <DialpadLogo />
        <div className="flex flex-col gap-[16px] items-center">
          <NavIcon icon={<Rocket className="size-[20px]" strokeWidth={1.75} />} />
          <NavIcon icon={<User className="size-[20px]" strokeWidth={1.75} />} />
          <NavIcon icon={<Settings className="size-[20px]" strokeWidth={1.75} />} />
          <NavIcon icon={<AiNotesIcon />} />
          <NavIcon icon={<Activity className="size-[20px]" strokeWidth={1.75} />} />
          <NavIcon icon={<History className="size-[20px]" strokeWidth={1.75} />} />
          <NavIcon 
            icon={<TrendingUp className="size-[20px]" strokeWidth={1.75} />} 
            active={activeNav === 'analytics'}
            onClick={() => setActiveNav('analytics')}
          />
        </div>
      </div>

      {/* Bottom Section */}
      <div className="flex flex-col gap-[4px] items-center">
        <NavIcon icon={<DialpadStarIcon />} />
        <NavIcon icon={<Video className="size-[20px]" strokeWidth={1.75} />} />
        <NavIcon icon={<HelpCircle className="size-[20px]" strokeWidth={1.75} />} />
        <div className="relative rounded-[50px] shrink-0 size-[32px] overflow-hidden">
          <img alt="User avatar" className="w-full h-full object-cover" src={imgPic} />
        </div>
      </div>
    </div>
  );
}

interface MenuItem {
  label: string;
  active?: boolean;
  indent?: boolean;
}

interface MenuSection {
  title?: string;
  items: MenuItem[];
  collapsible?: boolean;
  defaultOpen?: boolean;
}

function SecondaryNavigation() {
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(['ai-scorecards', 'playbooks']));
  const { currentPage, setCurrentPage } = useSidebar();

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev => {
      const newSet = new Set(prev);
      if (newSet.has(sectionId)) {
        newSet.delete(sectionId);
      } else {
        newSet.add(sectionId);
      }
      return newSet;
    });
  };

  return (
    <div className="bg-[#f9f9f9] w-[223px] h-full flex flex-col border-r border-[rgba(28,28,28,0.17)] overflow-y-auto">
      {/* Office Selector */}
      <div className="px-[12px] py-[11px] border-b border-[rgba(28,28,28,0.11)] pt-[12px] pr-[12px] pb-[10px] pl-[12px]">
        <button className="w-full flex items-center justify-between px-[12px] py-[8px] rounded-[8px] hover:bg-[rgba(28,28,28,0.06)] transition-colors">
          <span className="text-[15px] font-[510] text-[#3a3a3a]">Office 1</span>
          <ChevronDown className="size-[18px] text-[#3a3a3a]" strokeWidth={1.5} />
        </button>
      </div>

      {/* Navigation Items */}
      <div className="flex-1 py-[8px]">
        {/* Analytics Ai */}
        <button className="w-full px-[24px] font-[400] py-[10px] text-left text-[13px] text-[#1c1c1c] hover:bg-[rgba(28,28,28,0.06)] transition-colors">
          Analytics Ai
        </button>

        {/* All conversations */}
        <button 
          onClick={() => setCurrentPage('all-conversations')}
          className={`w-full px-[24px] py-[10px] font-[400] text-left text-[13px] text-[#1c1c1c] transition-colors ${
            currentPage === 'all-conversations' ? 'bg-[rgba(28,28,28,0.06)]' : 'hover:bg-[rgba(28,28,28,0.06)]'
          }`}
        >
          All conversations
        </button>

        {/* All calls */}
        <button className="w-full font-[400] px-[24px] py-[10px] text-left text-[13px] text-[#1c1c1c] hover:bg-[rgba(28,28,28,0.06)] transition-colors">
          All calls
        </button>

        {/* All digital */}
        <button className="w-full px-[24px] font-[400] py-[10px] text-left text-[13px] text-[#1c1c1c] hover:bg-[rgba(28,28,28,0.06)] transition-colors">
          All digital
        </button>

        {/* Divider */}
        <div className="h-[1px] bg-[rgba(28,28,28,0.11)] my-[8px] mt-[8px] mr-[0px] mb-[0px] ml-[0px]" />

        {/* Saved views */}
        <button 
          onClick={() => setCurrentPage('saved-views')}
          className={`w-full px-[24px] py-[10px] text-left text-[13px] font-[400] text-[#1c1c1c] transition-colors ${
            currentPage === 'saved-views' ? 'bg-[rgba(28,28,28,0.06)] font-[510]' : 'hover:bg-[rgba(28,28,28,0.06)]'
          }`}
        >
          Saved views
        </button>

        {/* Divider */}
        <div className="h-[1px] bg-[rgba(28,28,28,0.11)] my-[8px] mt-[0px] mr-[0px] mb-[8px] ml-[0px]" />

        {/* Ai CSAT */}
        <button className="w-full px-[24px] py-[10px] font-[400] text-left text-[13px] text-[#1c1c1c] hover:bg-[rgba(28,28,28,0.06)] transition-colors">
          Ai CSAT
        </button>

        {/* Ai Assistants */}
        <button className="w-full px-[24px] py-[10px] font-[400] text-left text-[13px] text-[#1c1c1c] hover:bg-[rgba(28,28,28,0.06)] transition-colors">
          Ai Assistants
        </button>

        {/* Business Intelligence */}
        <button className="w-full px-[24px] py-[10px] font-[400] text-left text-[13px] text-[#1c1c1c] hover:bg-[rgba(28,28,28,0.06)] transition-colors">
          Business Intelligence
        </button>

        {/* Reports */}
        <button className="w-full px-[24px] py-[10px] font-[400] text-left text-[13px] text-[#1c1c1c] hover:bg-[rgba(28,28,28,0.06)] transition-colors">
          Reports
        </button>

        {/* Ai Scorecards - Collapsible */}
        <div>
          <button 
            onClick={() => toggleSection('ai-scorecards')}
            className="w-full px-[24px] py-[10px] text-left font-[400] text-[13px] text-[#1c1c1c] hover:bg-[rgba(28,28,28,0.06)] transition-colors flex items-center justify-between"
          >
            <span>Ai Scorecards</span>
            <Plus 
              className="size-[16px]" 
              strokeWidth={2}
            />
          </button>
          {expandedSections.has('ai-scorecards') && (
            <div>
              <button className="w-full px-[40px] py-[8px] font-[400] text-left text-[13px] text-[#3a3a3a] hover:bg-[rgba(28,28,28,0.06)] transition-colors">
                Teams & groups
              </button>
              <button className="w-full px-[40px] py-[8px] font-[400] text-left text-[13px] text-[#3a3a3a] hover:bg-[rgba(28,28,28,0.06)] transition-colors">
                Agents
              </button>
              <button className="w-full px-[40px] py-[8px] font-[400] text-left text-[13px] text-[#3a3a3a] hover:bg-[rgba(28,28,28,0.06)] transition-colors">
                Scorecards
              </button>
            </div>
          )}
        </div>

        {/* Playbooks - Collapsible */}
        <div>
          <button 
            onClick={() => toggleSection('playbooks')}
            className="w-full px-[24px] py-[10px] font-[400] text-left text-[13px] text-[#1c1c1c] hover:bg-[rgba(28,28,28,0.06)] transition-colors flex items-center justify-between"
          >
            <span>Playbooks</span>
            <Plus 
              className="size-[16px]" 
              strokeWidth={2}
            />
          </button>
          {expandedSections.has('playbooks') && (
            <div>
              <button className="w-full px-[40px] py-[8px] font-[400] text-left text-[13px] text-[#3a3a3a] hover:bg-[rgba(28,28,28,0.06)] transition-colors">
                Teams & groups
              </button>
              <button className="w-full px-[40px] py-[8px] font-[400] text-left text-[13px] text-[#3a3a3a] hover:bg-[rgba(28,28,28,0.06)] transition-colors">
                Agents
              </button>
              <button className="w-full px-[40px] py-[8px] font-[400] text-left text-[13px] text-[#3a3a3a] hover:bg-[rgba(28,28,28,0.06)] transition-colors">
                Playbooks
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export function Sidebar() {
  const { isSecondaryCollapsed } = useSidebar();
  
  return (
    <div className="flex h-screen">
      <MainNavigation />
      {!isSecondaryCollapsed && <SecondaryNavigation />}
    </div>
  );
}