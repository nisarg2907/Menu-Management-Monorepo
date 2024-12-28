"use client"
import { 
    createContext, 
    useContext, 
    useState, 
    type ReactNode, 
    type Dispatch, 
    type SetStateAction 
  } from "react";
  
  interface SidebarState {
    readonly isCollapsed: boolean;
  }
  
  interface SidebarActions {
    readonly setIsCollapsed: Dispatch<SetStateAction<boolean>>;
    readonly toggleSidebar: () => void;
  }
  
  interface SidebarContextType extends SidebarState, SidebarActions {}
  
  interface SidebarProviderProps {
    readonly children: ReactNode;
    readonly initialState?: Partial<SidebarState>;
  }
  
  const SidebarContext = createContext<SidebarContextType | null>(null);
  
  class SidebarContextError extends Error {
    constructor(message: string) {
      super(message);
      this.name = 'SidebarContextError';
    }
  }
  
  export const SidebarProvider = ({ 
    children, 
    initialState = {} 
  }: SidebarProviderProps): JSX.Element => {
    const [isCollapsed, setIsCollapsed] = useState<boolean>(() => 
      initialState.isCollapsed ?? false
    );
  
    const toggleSidebar = (): void => {
      setIsCollapsed((prev) => !prev);
    };
  
    const contextValue: SidebarContextType = {
      isCollapsed,
      setIsCollapsed,
      toggleSidebar
    };
  
    return (
      <SidebarContext.Provider value={contextValue}>
        {children}
      </SidebarContext.Provider>
    );
  };
  
  export const useSidebar = (): SidebarContextType => {
    const context = useContext(SidebarContext);
    
    if (context === null) {
      throw new SidebarContextError(
        "useSidebar must be used within a SidebarProvider"
      );
    }
    
    return context;
  };
  
  export const isSidebarContext = (value: unknown): value is SidebarContextType => {
    return (
      typeof value === 'object' &&
      value !== null &&
      'isCollapsed' in value &&
      'setIsCollapsed' in value &&
      'toggleSidebar' in value
    );
  };
  
  export type { 
    SidebarState, 
    SidebarActions, 
    SidebarContextType, 
    SidebarProviderProps 
  };