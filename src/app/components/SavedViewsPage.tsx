import React, { useState, useMemo } from 'react';
import { Search, ChevronDown, File, LayoutDashboard, MoreVertical, PanelLeftClose, PanelLeftOpen, Check } from 'lucide-react';
import { useSidebar } from '../contexts/SidebarContext';
import * as Popover from '@radix-ui/react-popover';
import * as Tooltip from '@radix-ui/react-tooltip';

interface SavedView {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  owner: {
    name: string;
    avatar?: string;
    initials: string;
    color: string;
  };
  lastModified: string;
  type: 'document' | 'chart';
}

const mockViews: SavedView[] = [
  {
    id: '1',
    name: 'Digital CC - Ai Agentic Analytics',
    subtitle: 'Ai Agentic Analytics',
    description: 'Ai metrics: containment, handoff, and succes...',
    owner: { name: 'Richard Taylor', initials: 'RT', color: '#3F51B5', avatar: '' },
    lastModified: 'Jul 4, 2025',
    type: 'document'
  },
  {
    id: '2',
    name: 'Digital CC sessions - Past 30 days',
    subtitle: 'All digital',
    description: 'Digital session volume by channel over the la...',
    owner: { name: 'You', initials: 'YO', color: '#FF9800', avatar: '' },
    lastModified: 'Nov 19, 2024',
    type: 'chart'
  },
  {
    id: '3',
    name: 'Queue health - Past 7 days',
    subtitle: 'Queue health',
    description: 'Queue health: SLA, wait time, and abandonm...',
    owner: { name: 'Sean Brooks', initials: 'S', color: '#00BCD4', avatar: '' },
    lastModified: 'Aug 8, 2025',
    type: 'document'
  },
  {
    id: '4',
    name: 'Sales campaign',
    subtitle: 'Power Dialer',
    description: 'Campaign performance and sales outcomes',
    owner: { name: 'You', initials: 'YO', color: '#FF9800', avatar: '' },
    lastModified: 'Apr 2, 2025',
    type: 'document'
  },
  {
    id: '5',
    name: 'Sales CC Calls',
    subtitle: 'My searches',
    description: 'Sales contact center call performance',
    owner: { name: 'Shannon Ashley', initials: 'S', color: '#FFC107', avatar: '' },
    lastModified: 'Dec 7, 2024',
    type: 'chart'
  },
  {
    id: '6',
    name: 'Support CC - Agent productivity',
    subtitle: 'Agent productivity',
    description: 'Agent productivity and key handling time met...',
    owner: { name: 'You', initials: 'YO', color: '#FF9800', avatar: '' },
    lastModified: 'Jun 22, 2025',
    type: 'document'
  },
  {
    id: '7',
    name: 'Support CC - Past 7 days',
    subtitle: 'Conversations',
    description: 'Support conversation activity over the last 7...',
    owner: { name: 'Alex Johnson', initials: 'AJ', color: '#8B4513', avatar: '' },
    lastModified: 'Oct 15, 2024',
    type: 'chart'
  },
  {
    id: '8',
    name: 'Support callbacks - Past 60 days',
    subtitle: 'Callbacks',
    description: 'Callback volume and outcomes over the last...',
    owner: { name: 'You', initials: 'YO', color: '#FF9800', avatar: '' },
    lastModified: 'Feb 10, 2025',
    type: 'document'
  },
  {
    id: '9',
    name: 'Support CC Messages',
    subtitle: 'Message activity',
    description: 'Messaging activity and response-time trends',
    owner: { name: 'You', initials: 'YO', color: '#FF9800', avatar: '' },
    lastModified: 'Mar 18, 2025',
    type: 'document'
  }
];

export function SavedViewsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [featureFilter, setFeatureFilter] = useState<string>('all');
  const [ownerFilter, setOwnerFilter] = useState<string>('all');
  const [ownerSearch, setOwnerSearch] = useState('');
  const { isSecondaryCollapsed, toggleSecondary } = useSidebar();

  // Get unique features (subtitles)
  const uniqueFeatures = useMemo(() => {
    const features = Array.from(new Set(mockViews.map(v => v.subtitle)));
    return features.sort();
  }, []);

  // Get unique owners
  const uniqueOwners = useMemo(() => {
    const owners = Array.from(new Set(mockViews.map(v => v.owner.name)));
    return owners.sort();
  }, []);

  // Filter views based on all filters
  const filteredViews = useMemo(() => {
    return mockViews.filter(view => {
      // Search filter
      const matchesSearch = view.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           view.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           view.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      // Type filter
      const matchesType = typeFilter === 'all' || 
                         (typeFilter === 'dashboards' && view.type === 'chart') ||
                         (typeFilter === 'reports' && view.type === 'document');
      
      // Feature filter
      const matchesFeature = featureFilter === 'all' || view.subtitle === featureFilter;
      
      // Owner filter
      const matchesOwner = ownerFilter === 'all' || view.owner.name === ownerFilter;
      
      return matchesSearch && matchesType && matchesFeature && matchesOwner;
    });
  }, [searchQuery, typeFilter, featureFilter, ownerFilter]);

  // Filtered owners for search
  const filteredOwners = useMemo(() => {
    return uniqueOwners.filter(owner => 
      owner.toLowerCase().includes(ownerSearch.toLowerCase())
    );
  }, [uniqueOwners, ownerSearch]);

  const getTypeLabel = () => {
    if (typeFilter === 'all') return 'Type';
    if (typeFilter === 'dashboards') return 'Dashboards';
    if (typeFilter === 'reports') return 'Reports';
    return 'Type';
  };

  const getFeatureLabel = () => {
    return featureFilter === 'all' ? 'Feature' : featureFilter;
  };

  const getOwnerLabel = () => {
    return ownerFilter === 'all' ? 'Owner' : ownerFilter;
  };

  return (
    <Tooltip.Provider>
      {/* Top Header with Breadcrumbs and Toggle Button */}
      <div className="bg-[#f9f9f9] content-stretch flex items-center justify-between pl-[24px] pr-[32px] py-[16px] relative w-full border-b border-[rgba(28,28,28,0.11)] pt-[12px] pb-[12px]">
        <div className="flex items-center gap-[12px]">
          {/* Sidebar toggle button */}
          <button
            onClick={toggleSecondary}
            className="p-[8px] rounded-[8px] hover:bg-[rgba(0,0,0,0.05)] transition-colors cursor-pointer"
            title={isSecondaryCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {isSecondaryCollapsed ? (
              <PanelLeftOpen className="size-[20px] text-[#3a3a3a]" strokeWidth={1.75} />
            ) : (
              <PanelLeftClose className="size-[20px] text-[#3a3a3a]" strokeWidth={1.75} />
            )}
          </button>

          {/* Breadcrumbs */}
          <div className="content-stretch flex font-['SF_Pro:Regular',sans-serif] font-normal gap-[6px] items-center relative shrink-0 text-[12px]">
            <p className="leading-[1.2] relative shrink-0 text-[rgba(0,0,0,0.5)] tracking-[1.2px]">ANALYTICS</p>
            <p className="leading-[1.4] relative shrink-0 text-[#1c1c1c]">/</p>
            <p className="leading-[1.4] relative shrink-0 text-[#1c1c1c] tracking-[1.2px]">SAVED VIEWS</p>
          </div>
        </div>

        {/* Search box */}
        <div className="bg-[rgba(28,28,28,0.02)] relative rounded-[8px] shrink-0 w-[261px] border border-[rgba(28,28,28,0.17)]">
          <div className="content-stretch flex flex-row items-center px-[12px] py-[8px]">
            <svg className="size-[14px] text-[#3a3a3a] mr-[6px]" fill="none" viewBox="0 0 14 14">
              <path d="M6.33333 11C9.27885 11 11.6667 8.61218 11.6667 5.66667C11.6667 2.72115 9.27885 0.333344 6.33333 0.333344C3.38781 0.333344 1 2.72115 1 5.66667C1 8.61218 3.38781 11 6.33333 11Z" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M13 13L10.1 10.1" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <input
              type="text"
              placeholder="Search help center"
              className="flex-1 font-['SF_Pro:Regular',sans-serif] font-normal text-[12px] text-[#808080] bg-transparent outline-none"
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto bg-white">
        <div className="p-[24px] px-[32px] py-[24px]">
          {/* Header */}
          <h1 className="text-[28px] font-[510] text-[#1c1c1c] mb-[24px]">
            Saved views
          </h1>

          {/* Search and Filters */}
          <div className="flex items-center gap-[12px] mb-[24px]">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-[12px] top-1/2 -translate-y-1/2 size-[18px] text-[#757575]" strokeWidth={2} />
              <input
                type="text"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-[40px] pl-[40px] pr-[12px] border border-[#d1d1d1] rounded-[8px] text-[14px] text-[#1c1c1c] placeholder:text-[#757575] focus:outline-none focus:border-[#1c1c1c]"
              />
            </div>

            {/* Type Filter */}
            <Popover.Root>
              <Popover.Trigger asChild>
                <button className="h-[40px] px-[16px] border border-[#d1d1d1] rounded-[8px] text-[14px] text-[#1c1c1c] hover:bg-[#f5f5f5] transition-colors flex items-center gap-[8px]">
                  <span>{getTypeLabel()}</span>
                  <ChevronDown className="size-[16px]" strokeWidth={2} />
                </button>
              </Popover.Trigger>
              <Popover.Portal>
                <Popover.Content 
                  className="bg-white rounded-lg shadow-lg border border-[#e0e0e0] w-[180px] p-1 z-50"
                  sideOffset={5}
                  align="start"
                >
                  <button
                    onClick={() => setTypeFilter('all')}
                    className="w-full text-left px-3 py-2 text-[14px] rounded hover:bg-[#f5f5f5] transition-colors flex items-center justify-between"
                  >
                    <span>All types</span>
                    {typeFilter === 'all' && <Check className="size-[16px]" strokeWidth={2} />}
                  </button>
                  <button
                    onClick={() => setTypeFilter('dashboards')}
                    className="w-full text-left px-3 py-2 text-[14px] rounded hover:bg-[#f5f5f5] transition-colors flex items-center justify-between"
                  >
                    <span>Dashboards</span>
                    {typeFilter === 'dashboards' && <Check className="size-[16px]" strokeWidth={2} />}
                  </button>
                  <button
                    onClick={() => setTypeFilter('reports')}
                    className="w-full text-left px-3 py-2 text-[14px] rounded hover:bg-[#f5f5f5] transition-colors flex items-center justify-between"
                  >
                    <span>Reports</span>
                    {typeFilter === 'reports' && <Check className="size-[16px]" strokeWidth={2} />}
                  </button>
                </Popover.Content>
              </Popover.Portal>
            </Popover.Root>

            {/* Feature Filter */}
            <Popover.Root>
              <Popover.Trigger asChild>
                <button className="h-[40px] px-[16px] border border-[#d1d1d1] rounded-[8px] text-[14px] text-[#1c1c1c] hover:bg-[#f5f5f5] transition-colors flex items-center gap-[8px]">
                  <span className="truncate max-w-[150px]">{getFeatureLabel()}</span>
                  <ChevronDown className="size-[16px]" strokeWidth={2} />
                </button>
              </Popover.Trigger>
              <Popover.Portal>
                <Popover.Content 
                  className="bg-white rounded-lg shadow-lg border border-[#e0e0e0] w-[220px] p-1 z-50 max-h-[300px] overflow-y-auto"
                  sideOffset={5}
                  align="start"
                >
                  <button
                    onClick={() => setFeatureFilter('all')}
                    className="w-full text-left px-3 py-2 text-[14px] rounded hover:bg-[#f5f5f5] transition-colors flex items-center justify-between"
                  >
                    <span>All features</span>
                    {featureFilter === 'all' && <Check className="size-[16px]" strokeWidth={2} />}
                  </button>
                  {uniqueFeatures.map(feature => (
                    <button
                      key={feature}
                      onClick={() => setFeatureFilter(feature)}
                      className="w-full text-left px-3 py-2 text-[14px] rounded hover:bg-[#f5f5f5] transition-colors flex items-center justify-between"
                    >
                      <span className="truncate">{feature}</span>
                      {featureFilter === feature && <Check className="size-[16px]" strokeWidth={2} />}
                    </button>
                  ))}
                </Popover.Content>
              </Popover.Portal>
            </Popover.Root>

            {/* Owner Filter */}
            <Popover.Root>
              <Popover.Trigger asChild>
                <button className="h-[40px] px-[16px] border border-[#d1d1d1] rounded-[8px] text-[14px] text-[#1c1c1c] hover:bg-[#f5f5f5] transition-colors flex items-center gap-[8px]">
                  <span className="truncate max-w-[120px]">{getOwnerLabel()}</span>
                  <ChevronDown className="size-[16px]" strokeWidth={2} />
                </button>
              </Popover.Trigger>
              <Popover.Portal>
                <Popover.Content 
                  className="bg-white rounded-lg shadow-lg border border-[#e0e0e0] w-[200px] p-2 z-50"
                  sideOffset={5}
                  align="start"
                >
                  {/* Search input */}
                  <div className="relative mb-2">
                    <Search className="absolute left-2 top-1/2 -translate-y-1/2 size-[14px] text-[#757575]" strokeWidth={2} />
                    <input
                      type="text"
                      placeholder="Search owners"
                      value={ownerSearch}
                      onChange={(e) => setOwnerSearch(e.target.value)}
                      className="w-full pl-7 pr-2 py-1.5 text-[13px] border border-[#d1d1d1] rounded focus:outline-none focus:border-[#1c1c1c]"
                    />
                  </div>
                  
                  {/* Owner list */}
                  <div className="max-h-[200px] overflow-y-auto">
                    <button
                      onClick={() => { setOwnerFilter('all'); setOwnerSearch(''); }}
                      className="w-full text-left px-2 py-1.5 text-[14px] rounded hover:bg-[#f5f5f5] transition-colors flex items-center justify-between"
                    >
                      <span>All owners</span>
                      {ownerFilter === 'all' && <Check className="size-[16px]" strokeWidth={2} />}
                    </button>
                    {filteredOwners.map(owner => (
                      <button
                        key={owner}
                        onClick={() => { setOwnerFilter(owner); setOwnerSearch(''); }}
                        className="w-full text-left px-2 py-1.5 text-[14px] rounded hover:bg-[#f5f5f5] transition-colors flex items-center justify-between"
                      >
                        <span className="truncate">{owner}</span>
                        {ownerFilter === owner && <Check className="size-[16px]" strokeWidth={2} />}
                      </button>
                    ))}
                  </div>
                </Popover.Content>
              </Popover.Portal>
            </Popover.Root>
          </div>

          {/* Table */}
          <div className="border border-[#e0e0e0] rounded-[12px] overflow-hidden">
            {/* Table Header */}
            <div className="bg-[#fafafa] border-b border-[#e0e0e0] px-[16px] py-[12px] flex items-center text-[13px] text-[#757575] font-[500]">
              <div className="min-w-[240px] w-[350px] flex items-center gap-[4px]">
                <span>Name</span>
                <ChevronDown className="size-[14px]" strokeWidth={2} />
              </div>
              <div className="min-w-[260px] flex-1 flex items-center gap-[4px]">
                <span>Details</span>
                <svg className="size-[14px]" fill="none" viewBox="0 0 14 14">
                  <path d="M7 3v8M4 8l3 3 3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div className="w-[200px] flex items-center gap-[4px]">
                <span>Owner</span>
                <svg className="size-[14px]" fill="none" viewBox="0 0 14 14">
                  <path d="M7 3v8M4 8l3 3 3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div className="w-[150px] flex items-center gap-[4px]">
                <span>Last modified</span>
                <svg className="size-[14px]" fill="none" viewBox="0 0 14 14">
                  <path d="M7 3v8M4 8l3 3 3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div className="w-[40px]"></div>
            </div>

            {/* Table Body */}
            <div>
              {filteredViews.map((view, index) => (
                <div
                  key={view.id}
                  className={`px-[16px] py-[12px] flex items-start hover:bg-[#f5f5f5] transition-colors ${
                    index < filteredViews.length - 1 ? 'border-b border-[#e0e0e0]' : ''
                  }`}
                >
                  {/* Name */}
                  <div className="min-w-[240px] w-[350px] flex items-center gap-[12px]">
                    {view.type === 'document' ? (
                      <Tooltip.Root>
                        <Tooltip.Trigger asChild>
                          <div>
                            <File className="size-[16px] text-[#757575] flex-shrink-0" strokeWidth={1.5} />
                          </div>
                        </Tooltip.Trigger>
                        <Tooltip.Portal>
                          <Tooltip.Content
                            className="bg-[#1c1c1c] text-white text-[12px] px-2 py-1 rounded shadow-lg"
                            sideOffset={5}
                          >
                            Report
                            <Tooltip.Arrow className="fill-[#1c1c1c]" />
                          </Tooltip.Content>
                        </Tooltip.Portal>
                      </Tooltip.Root>
                    ) : (
                      <Tooltip.Root>
                        <Tooltip.Trigger asChild>
                          <div>
                            <LayoutDashboard className="size-[16px] text-[#ff69b4] flex-shrink-0" strokeWidth={1.5} />
                          </div>
                        </Tooltip.Trigger>
                        <Tooltip.Portal>
                          <Tooltip.Content
                            className="bg-[#1c1c1c] text-white text-[12px] px-2 py-1 rounded shadow-lg"
                            sideOffset={5}
                          >
                            Dashboard
                            <Tooltip.Arrow className="fill-[#1c1c1c]" />
                          </Tooltip.Content>
                        </Tooltip.Portal>
                      </Tooltip.Root>
                    )}
                    <div className="min-w-0 flex-1">
                      <div className="text-[14px] text-[#1c1c1c] font-[400] truncate">
                        {view.name}
                      </div>
                      <div className="text-[12px] text-black/50 truncate">
                        {view.subtitle}
                      </div>
                    </div>
                  </div>

                  {/* Details */}
                  <div className="min-w-[260px] flex-1 text-[14px] text-[#757575] truncate pr-[16px]">
                    {view.description}
                  </div>

                  {/* Owner */}
                  <div className="w-[200px] flex items-center gap-[8px]">
                    <div 
                      className="size-[24px] rounded-full flex items-center justify-center text-white text-[13px] font-[500] flex-shrink-0"
                      style={{ backgroundColor: view.owner.color }}
                    >
                      {view.owner.initials[0]}
                    </div>
                    <span className="text-[14px] text-[rgb(117,117,117)] truncate">
                      {view.owner.name}
                    </span>
                  </div>

                  {/* Last Modified */}
                  <div className="w-[150px] text-[14px] text-[#757575]">
                    {view.lastModified}
                  </div>

                  {/* Actions */}
                  <div className="w-[40px] flex justify-center">
                    <Popover.Root>
                      <Popover.Trigger asChild>
                        <button className="p-[2px] hover:bg-[#e0e0e0] rounded transition-colors">
                          <MoreVertical className="size-[16px] text-[#757575]" strokeWidth={2} />
                        </button>
                      </Popover.Trigger>
                      <Popover.Portal>
                        <Popover.Content
                          className="bg-white rounded-lg shadow-lg border border-[#e0e0e0] w-[160px] p-1 z-50"
                          sideOffset={5}
                          align="end"
                        >
                          <button
                            onClick={() => {
                              console.log('Duplicate view:', view.id);
                            }}
                            className="w-full text-left px-3 py-2 text-[14px] rounded hover:bg-[#f5f5f5] transition-colors"
                          >
                            Duplicate
                          </button>
                          {view.owner.name === 'You' && (
                            <button
                              onClick={() => {
                                console.log('Delete view:', view.id);
                              }}
                              className="w-full text-left px-3 py-2 text-[14px] rounded hover:bg-[#fee] transition-colors text-[#dc2626]"
                            >
                              Delete
                            </button>
                          )}
                        </Popover.Content>
                      </Popover.Portal>
                    </Popover.Root>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Tooltip.Provider>
  );
}