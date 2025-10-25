'use client';
import { cn } from '@/lib/utils';
import { IPhoneModel } from '@/types';
import React from 'react';
import { ThreeCameras } from '../../cameras/iphones/ThreeCemeras';
import { TwoCamerasDiagonal } from '../../cameras/iphones/TwoCamerasDiagonal';
import { TwoCamerasVertical } from '../../cameras/iphones/TwoCamerasVertical';
import { RightSideButtons } from './RightSideButtons';
import { LeftSideButtons } from './LeftSideButtons';

interface IPhoneCaseProps {
  model: IPhoneModel;
  children: React.ReactNode;
  frameColor: string;
  cameraColor: string;
  isResizeMode: boolean;
}

export const IPhoneCase: React.FC<IPhoneCaseProps> = ({
  model,
  children,
  frameColor,
  cameraColor,
  isResizeMode,
}) => {
  return (
    <div className="relative h-full w-full rounded-[2rem] bg-transparent">
      {/* Side Buttons - Left Side */}
      <LeftSideButtons frameColor={frameColor} />

      {/* Side Button - Right Side */}
      <RightSideButtons frameColor={frameColor} />

      <div
        className="absolute h-full w-full rounded-[2rem] shadow-xl bg-transparent border-[6px] z-40 pointer-events-none"
        style={{ borderColor: frameColor }}
      />

      {/* Outer Shadow */}
      {isResizeMode && (
        <div
          className={cn(
            'shadow-element absolute inset-0 rounded-[2rem] z-30  bg-transparent pointer-events-none',
            'top-[0] right-[0] left-[0] bottom-[0] shadow-[0_0_0_100vh_rgba(229,231,235,0.8)] dark:shadow-[0_0_0_100vh_rgba(17,24,39,0.8)]'
          )}
        />
      )}

      {[
        '13pro',
        '13promax',
        '14pro',
        '14promax',
        '15pro',
        '15promax',
        '16pro',
        '16promax',
      ].includes(model) && <ThreeCameras cameraColor={cameraColor} />}

      {['13', '13mini', '14', '14plus', '15', '15plus'].includes(model) && (
        <TwoCamerasDiagonal cameraColor={cameraColor} />
      )}

      {['16', '16plus'].includes(model) && (
        <TwoCamerasVertical cameraColor={cameraColor} />
      )}

      {children}
    </div>
  );
};
