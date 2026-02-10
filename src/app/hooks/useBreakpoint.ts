import { useState, useEffect } from 'react';

export function useBreakpoint() {
  const [breakpoint, setBreakpoint] = useState<'sm' | 'md' | 'lg'>('lg');

  useEffect(() => {
    const updateBreakpoint = () => {
      const width = window.innerWidth;
      if (width < 720) {
        setBreakpoint('sm');
      } else if (width < 1400) {
        setBreakpoint('md');
      } else {
        setBreakpoint('lg');
      }
    };

    updateBreakpoint();
    window.addEventListener('resize', updateBreakpoint);
    return () => window.removeEventListener('resize', updateBreakpoint);
  }, []);

  // Return max FR units based on breakpoint
  const maxFrUnits = breakpoint === 'md' ? 6 : 12;

  return { breakpoint, maxFrUnits };
}
