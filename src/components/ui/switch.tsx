'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

export interface SwitchProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  description?: string;
  onCheckedChange?: (checked: boolean) => void;
}

const Switch = React.forwardRef<HTMLInputElement, SwitchProps>(
  ({ className, label, description, id, onCheckedChange, ...props }, ref) => {
    const switchId = id || label?.toLowerCase().replace(/\s+/g, '-');

    return (
      <div className="flex items-start gap-3">
        <div className="relative flex items-center">
          <input
            type="checkbox"
            id={switchId}
            ref={ref}
            className={cn(
              'peer h-5 w-5 appearance-none rounded-full border-2 border-frost-300 dark:border-frost-600',
              'bg-white dark:bg-frost-800',
              'checked:bg-ice-500 checked:border-ice-500',
              'checked:after:translate-x-full',
              'after:content-[""] after:absolute after:top-0.5 after:left-0.5 after:h-4 after:w-4',
              'after:rounded-full after:bg-white after:shadow-md',
              'after:transition-transform after:duration-200',
              'focus:outline-none focus:ring-2 focus:ring-ice-500 focus:ring-offset-2',
              'disabled:opacity-50 disabled:cursor-not-allowed',
              className
            )}
            onChange={(e) => onCheckedChange?.(e.target.checked)}
            {...props}
          />
        </div>
        {(label || description) && (
          <div className="pt-1">
            {label && (
              <label htmlFor={switchId} className="font-medium text-frost-900 dark:text-white cursor-pointer">
                {label}
              </label>
            )}
            {description && (
              <p className="text-sm text-frost-500 dark:text-frost-400 mt-0.5">{description}</p>
            )}
          </div>
        )}
      </div>
    );
  }
);
Switch.displayName = 'Switch';

export { Switch };