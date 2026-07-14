'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

interface SeparatorProps extends React.HTMLAttributes<HTMLHRElement> {
  orientation?: 'horizontal' | 'vertical';
  decorative?: boolean;
}

const Separator = React.forwardRef<HTMLHRElement, SeparatorProps>(
  ({ className, orientation = 'horizontal', decorative = true, ...props }, ref) => {
    return (
      <hr
        ref={ref}
        role={decorative ? 'none' : 'separator'}
        aria-orientation={orientation}
        className={cn(
          'bg-frost-200 dark:bg-frost-700 border-0',
          orientation === 'horizontal' ? 'w-full h-px' : 'h-full w-px',
          className
        )}
        {...props}
      />
    );
  }
);
Separator.displayName = 'Separator';

export { Separator };