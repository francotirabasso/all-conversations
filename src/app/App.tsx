import Frame1000003766 from '@/imports/Frame1000003766';
import TopHeader from '@/imports/TopHeader';
import { Sidebar } from './components/Sidebar';
import { SavedViewsPage } from './components/SavedViewsPage';
import { GlobalFiltersProvider, useGlobalFilters } from './contexts/GlobalFiltersContext';
import { SidebarProvider, useSidebar } from './contexts/SidebarContext';

function LoadingSkeleton() {
  return (
    <div className="fixed inset-0 bg-white z-[100] flex flex-col">
      {/* Header skeleton */}
      <div className="w-full px-6 py-6 border-b border-gray-200">
        <div className="h-8 w-64 bg-gray-200 rounded-lg animate-pulse mb-4"></div>
        <div className="h-4 w-48 bg-gray-100 rounded animate-pulse"></div>
      </div>
      
      {/* Content skeleton */}
      <div className="flex-1 p-6 overflow-hidden">
        {/* First row */}
        <div className="grid grid-cols-4 gap-6 mb-6">
          <div className="h-32 bg-gray-100 rounded-xl animate-pulse"></div>
          <div className="h-32 bg-gray-100 rounded-xl animate-pulse"></div>
          <div className="h-32 bg-gray-100 rounded-xl animate-pulse"></div>
          <div className="h-32 bg-gray-100 rounded-xl animate-pulse"></div>
        </div>
        
        {/* Second row */}
        <div className="grid grid-cols-2 gap-6 mb-6">
          <div className="h-80 bg-gray-100 rounded-xl animate-pulse"></div>
          <div className="h-80 bg-gray-100 rounded-xl animate-pulse"></div>
        </div>
        
        {/* Third row */}
        <div className="h-96 bg-gray-100 rounded-xl animate-pulse"></div>
      </div>
    </div>
  );
}

function AppContent() {
  const { isLoadingView } = useGlobalFilters();
  const { currentPage } = useSidebar();
  
  return (
    <div className="flex h-screen w-screen min-w-[720px] overflow-hidden bg-gray-50">
      {isLoadingView && <LoadingSkeleton />}
      
      {/* Sidebar */}
      <div className="flex-shrink-0">
        <Sidebar />
      </div>
      
      {/* Main Content */}
      {currentPage === 'all-conversations' && (
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
          <div className="flex-shrink-0">
            <TopHeader />
          </div>
          <div className="flex-1 overflow-auto">
            <Frame1000003766 />
          </div>
        </div>
      )}
      
      {currentPage === 'saved-views' && (
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
          <SavedViewsPage />
        </div>
      )}
    </div>
  );
}

export default function App() {
  return (
    <GlobalFiltersProvider>
      <SidebarProvider>
        <AppContent />
      </SidebarProvider>
    </GlobalFiltersProvider>
  );
}