import { cn } from '@/lib/utils';
import React from 'react';
import { CameraLense } from './CameraLense';
import { CameraFlash } from './CameraFlash';
import { LiDARScanner } from './LiDARScanner';

interface NewCameraProps {
  cameraColor: string;
}

export const ThreeCameras = ({ cameraColor }: NewCameraProps) => {
  return (
    <div
      className={cn(
        'absolute top-[8px] left-[8px] rounded-[38px] p-3 z-50 w-[8.5rem] h-[8.5rem]',
        'shadow-[inset_0_2px_4px_0_rgba(0,0,0,0.8),0_1px_3px_0_rgba(0,0,0,0.6)]'
      )}
      style={{ backgroundColor: cameraColor }}
    >
      <div className="flex justify-between">
        {/* left side */}
        <div className="flex flex-col gap-3">
          <CameraLense />
          <CameraLense />
        </div>

        {/* right side */}
        <div className="flex flex-col items-center justify-center gap-1">
          <CameraFlash />
          <CameraLense />
          <div className="flex">
            <LiDARScanner />
            <div className="w-2 h-2 bg-[#2c2c2c] dark:bg-[#1a1a1a] rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
};
