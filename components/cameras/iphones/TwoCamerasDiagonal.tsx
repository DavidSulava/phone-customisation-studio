import { cn } from '@/lib/utils';
import React from 'react';
import { CameraLense } from './CameraLense';
import { CameraFlash } from './CameraFlash';

interface NewCameraProps {
  cameraColor: string;
}

export const TwoCamerasDiagonal = ({ cameraColor }: NewCameraProps) => {
  return (
    <div
      className={cn(
        'absolute top-[8px] left-[8px] rounded-[38px] p-2 z-50 w-[7.5rem] h-[7.5rem]',
        'shadow-[inset_0_2px_4px_0_rgba(0,0,0,0.8),0_1px_3px_0_rgba(0,0,0,0.6)]'
      )}
      style={{ backgroundColor: cameraColor }}
    >
      <div className="flex w-full h-full">
        {/* left side */}
        <div className="flex flex-col items-center gap-6">
          <CameraLense />
          <div className="w-2 h-2 bg-[#2c2c2c] dark:bg-[#1a1a1a] rounded-full shadow-sm shadow-gray-500" />
        </div>

        {/* right side */}
        <div className="flex flex-col items-center justify-center gap-4">
          <CameraFlash />
          <CameraLense />
        </div>
      </div>
    </div>
  );
};
