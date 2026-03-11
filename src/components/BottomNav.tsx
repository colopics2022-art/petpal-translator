import { NavLink, useLocation } from 'react-router-dom';
import { Home, Mic, Camera, PawPrint, Clock, Settings } from 'lucide-react';
import { cn } from '@/lib/utils';

const tabs = [
  { to: '/', icon: Home, label: 'Home' },
  { to: '/listen', icon: Mic, label: 'Listen' },
  { to: '/watch', icon: Camera, label: 'Watch' },
  { to: '/pets', icon: PawPrint, label: 'My Pets' },
  { to: '/history', icon: Clock, label: 'History' },
  { to: '/settings', icon: Settings, label: 'Settings' },
];

export default function BottomNav() {
  const location = useLocation();
  
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-background/95 backdrop-blur-md safe-area-bottom">
      <div className="mx-auto flex max-w-lg items-center justify-around px-1 py-1">
        {tabs.map(({ to, icon: Icon, label }) => {
          const isActive = location.pathname === to;
          return (
            <NavLink
              key={to}
              to={to}
              className={cn(
                "flex flex-col items-center gap-0.5 rounded-xl px-2 py-1.5 text-[10px] font-medium transition-all",
                isActive
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <div className={cn(
                "flex h-8 w-8 items-center justify-center rounded-xl transition-all",
                isActive && "gradient-amber shadow-card"
              )}>
                <Icon className={cn("h-4 w-4", isActive && "text-primary-foreground")} />
              </div>
              <span>{label}</span>
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
}
