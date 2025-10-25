import { cn } from '@/lib/utils';
import React from 'react';
import { CameraLense } from './CameraLense';
import { CameraFlash } from './CameraFlash';

export const ThreeCamerasVertical = () => {
  return (
    <div className={cn('absolute top-[8px] left-[8px]  p-3 z-50 ')}>
      <div className="flex justify-between">
        {/* left side */}
        <div className="flex flex-col gap-3">
          <CameraLense />
          <CameraLense />
          <CameraLense />
        </div>

        {/* right side */}
        <div className="flex flex-col p-3">
          <CameraFlash />
        </div>
      </div>
    </div>
  );
};
