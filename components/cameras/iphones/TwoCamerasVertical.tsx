import { cn } from '@/lib/utils';
import React from 'react';
import { CameraLense } from './CameraLense';
import { CameraFlash } from './CameraFlash';

interface NewCameraProps {
  cameraColor: string;
}

export const TwoCamerasVertical = ({ cameraColor }: NewCameraProps) => {
  return (
    <div className="absolute top-[8px] left-[8px]  m-1 z-50 flex items-center gap-1">
      <div
        className={cn(
          'shadow-[inset_0_2px_4px_0_rgba(0,0,0,0.8),0_1px_3px_0_rgba(0,0,0,0.6)] rounded-[38px] p-2'
        )}
        style={{ backgroundColor: cameraColor }}
      >
        <div className="flex flex-col gap-2 w-full h-full">
          <CameraLense />
          <CameraLense />
        </div>
      </div>
      <CameraFlash />
    </div>
  );
};
