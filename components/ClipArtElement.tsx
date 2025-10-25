import React, { useRef } from 'react';
import { Rnd } from 'react-rnd';
import { ResizeControl } from './ResizeControl';
import { X } from 'lucide-react';
import Image from 'next/image';

interface ClipArtElementProps {
  id: string;
  src: string;
  position: { x: number; y: number };
  scale: number;
  rotation: number;
  isSelected: boolean;
  onSelect?: () => void;
  onPositionChange?: (x: number, y: number) => void;
  onTransformChange?: (scale: number, rotation: number) => void;
  onRemove?: () => void;
}

export const ClipArtElement = ({
  src,
  position,
  scale,
  rotation,
  isSelected,
  onSelect,
  onPositionChange,
  onTransformChange,
  onRemove,
}: ClipArtElementProps) => {
  const touchTimeout = useRef<number | undefined>(undefined);
  const touchCount = useRef(0);

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    e.stopPropagation();
    touchCount.current += 1;

    if (touchCount.current === 1) {
      touchTimeout.current = window.setTimeout(() => {
        touchCount.current = 0;
        onSelect?.();
      }, 200);
    }
  };

  const handleTouchEnd = () => {
    if (touchCount.current === 1) {
      touchTimeout.current = window.setTimeout(() => {
        touchCount.current = 0;
      }, 300);
    }
  };

  return (
    <Rnd
      default={{
        x: position.x,
        y: position.y,
        width: 100 * scale,
        height: 100 * scale,
      }}
      minWidth={30}
      minHeight={30}
      enableResizing={isSelected}
      onDragStop={(_e, d) => onPositionChange?.(d.x, d.y)}
      onResize={(_e, _direction, ref, _delta, position) => {
        const newScale = ref.offsetWidth / 100;
        onTransformChange?.(newScale, rotation);
        onPositionChange?.(position.x, position.y);
      }}
      onClick={(e: React.MouseEvent) => {
        e.stopPropagation();
        onSelect?.();
      }}
      resizeHandleComponent={
        isSelected
          ? {
              topLeft: <ResizeControl />,
              topRight: <ResizeControl />,
              bottomLeft: <ResizeControl />,
              bottomRight: <ResizeControl />,
            }
          : {}
      }
      className={`${isSelected ? 'ring-2 ring-blue-500' : ''} relative`}
    >
      {isSelected && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onRemove?.();
          }}
          className="absolute -top-2 -right-8 bg-red-500 hover:bg-red-600 text-white rounded-full p-0.5 shadow-sm transition-colors"
        >
          <X className="h-3 w-3" />
        </button>
      )}
      <div
        className="w-full h-full relative touch-manipulation"
        style={{
          transform: `rotate(${rotation}deg)`,
          transformOrigin: 'center center',
        }}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <Image
          src={src}
          alt="Clipart"
          fill
          className="pointer-events-none"
          style={{ objectFit: 'contain' }}
        />
      </div>
    </Rnd>
  );
};
