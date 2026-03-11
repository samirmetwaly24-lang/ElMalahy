import { useEffect } from 'react';
import { useTheme } from '@/hooks/useTheme';
import { Moon, Sun, Settings } from 'lucide-react';

interface ControlPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ControlPanel({ isOpen, onClose }: ControlPanelProps) {
  const { theme, setTheme, isDark } = useTheme();

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('[data-testid="control-panel"]') && !target.closest('[data-testid="button-control-panel"]')) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, onClose]);

  const themeOptions = [
    { value: 'light' as const, label: 'Light', icon: Sun },
    { value: 'dark' as const, label: 'Dark', icon: Moon },
    { value: 'auto' as const, label: 'Auto', icon: Settings },
  ];

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-30 transition-opacity duration-300"
          style={{ opacity: isOpen ? 1 : 0 }}
          onClick={onClose}
          data-testid="control-panel-backdrop"
        />
      )}

      {/* Panel */}
      <div
        data-testid="control-panel"
        className={`fixed right-6 md:right-8 top-52 md:top-64 z-40 w-64 transition-all duration-300 ease-out transform ${
          isOpen
            ? 'opacity-100 scale-100 translate-x-0'
            : 'opacity-0 scale-95 translate-x-8 pointer-events-none'
        }`}
      >
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl dark:shadow-2xl dark:shadow-black/50 backdrop-blur-xl p-6 border border-white/20 dark:border-slate-700/50">
          {/* Header */}
          <div className="mb-6">
            <h3 className="text-lg font-display font-bold text-foreground dark:text-white mb-1">
              Settings
            </h3>
            <p className="text-sm text-muted-foreground dark:text-slate-400">
              Customize your experience
            </p>
          </div>

          {/* Theme Options */}
          <div className="space-y-3 mb-6">
            <p className="text-xs uppercase tracking-widest text-muted-foreground dark:text-slate-500 font-semibold">
              Theme
            </p>
            <div className="space-y-2">
              {themeOptions.map(({ value, label, icon: Icon }) => (
                <button
                  key={value}
                  onClick={() => {
                    setTheme(value);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                    theme === value
                      ? 'bg-primary text-white dark:bg-primary dark:text-white shadow-lg'
                      : 'bg-muted/50 dark:bg-slate-700/50 text-foreground dark:text-slate-300 hover:bg-muted dark:hover:bg-slate-700'
                  }`}
                  data-testid={`button-theme-${value}`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="font-medium text-sm">{label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Current theme indicator */}
          <div className="pt-4 border-t border-border dark:border-slate-700/50">
            <p className="text-xs text-muted-foreground dark:text-slate-500">
              {isDark ? '🌙 Dark Mode Active' : '☀️ Light Mode Active'}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
