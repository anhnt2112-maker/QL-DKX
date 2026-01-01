
import React from 'react';
import { NAV_ITEMS } from '../constants';
import { Screen } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  activeScreen: Screen;
  onNavigate: (screen: Screen) => void;
  hideNav?: boolean;
}

export const Layout: React.FC<LayoutProps> = ({ children, activeScreen, onNavigate, hideNav }) => {
  return (
    <div className="min-h-screen bg-slate-100 flex justify-center">
      <div className="w-full max-w-md bg-white min-h-screen relative flex flex-col shadow-xl overflow-hidden">
        <div className="flex-1 overflow-y-auto pb-24">
          {children}
        </div>
        
        {!hideNav && (
          <nav className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-6 py-3 flex justify-between items-center z-50">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id as Screen)}
                className={`flex flex-col items-center space-y-1 ${
                  activeScreen === item.id ? 'text-blue-600' : 'text-gray-400'
                }`}
              >
                <item.icon size={24} />
                <span className="text-[10px] font-medium">{item.label}</span>
              </button>
            ))}
          </nav>
        )}
      </div>
    </div>
  );
};
