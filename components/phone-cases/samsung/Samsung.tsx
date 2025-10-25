'use client';
import { ThreeCamerasVertical } from '@/components/cameras/sumsung/ThreeCemerasVertical';
import { cn } from '@/lib/utils';
import { SamsungModel } from '@/types';
import React from 'react';
import { LeftSideButtons } from './LeftSideButtons';

interface IPhoneCaseProps {
  model: SamsungModel;
  children: React.ReactNode;
  frameColor: string;
  cameraColor: string;
  isResizeMode: boolean;
  radius?: number;
}

export const SamsungCase: React.FC<IPhoneCaseProps> = ({
  model,
  children,
  frameColor,
  isResizeMode,
  radius,
}) => {
  return (
    <div
      className="relative h-full w-full rounded-[2rem] bg-transparent"
      style={{
        borderRadius: radius ? `${radius}rem` : '2rem',
      }}
    >
      {/* Side Buttons - Left Side */}
      <LeftSideButtons frameColor={frameColor} />

      <div
        className="absolute h-full w-full rounded-[2rem] shadow-xl bg-transparent border-[6px] z-40 pointer-events-none"
        style={{
          borderColor: frameColor,
          borderRadius: radius ? `${radius}rem` : '2rem',
        }}
      />

      {/* Outer Shadow */}
      {isResizeMode && (
        <div
          className={cn(
            'shadow-element absolute inset-0 rounded-[2rem] z-30  bg-transparent pointer-events-none',
            'top-[0] right-[0] left-[0] bottom-[0] shadow-[0_0_0_100vh_rgba(229,231,235,0.8)] dark:shadow-[0_0_0_100vh_rgba(17,24,39,0.8)]'
          )}
          style={{ borderRadius: radius ? `${radius}rem` : '2rem' }}
        />
      )}

      {['s23'].includes(model) && <ThreeCamerasVertical />}

      {children}
    </div>
  );
};
