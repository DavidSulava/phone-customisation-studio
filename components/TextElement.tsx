'use client';

import React, { useState, useRef } from 'react';
import { Rnd } from 'react-rnd';
import { ResizeControl } from './ResizeControl';
import { X } from 'lucide-react';
import { useEditor } from '@/contexts/EditorContext';

interface TextElementProps {
  id: string;
  text: string;
  position: { x: number; y: number };
  font: string;
  color: string;
  fontSize: number;
  isBold: boolean;
  isItalic: boolean;
  isUppercase: boolean;
  textAlign: 'left' | 'center' | 'right';
  isSelected: boolean;
  onSelect?: () => void;
  onPositionChange?: (x: number, y: number) => void;
  onTextChange?: (text: string) => void;
  onRemove?: () => void;
}

export const TextElement = ({
  id,
  text,
  position,
  font,
  color,
  fontSize,
  isBold,
  isItalic,
  isUppercase,
  textAlign,
  isSelected,
  onSelect,
  onPositionChange,
  onTextChange,
  onRemove,
}: TextElementProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const touchTimeout = useRef<number | undefined>(undefined);
  const touchCount = useRef(0);

  const handleDoubleClick = () => {
    setIsEditing(true);
    onSelect?.();
  };

  const handleBlur = (e: React.FocusEvent<HTMLDivElement>) => {
    setIsEditing(false);
    onTextChange?.(e.target.textContent || '');
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    touchCount.current += 1;

    if (touchCount.current === 1) {
      touchTimeout.current = window.setTimeout(() => {
        touchCount.current = 0;
        onSelect?.();
      }, 200);
    } else if (touchCount.current === 2) {
      clearTimeout(touchTimeout.current);
      touchCount.current = 0;
      handleDoubleClick();
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
        width: 'auto',
        height: 'auto',
      }}
      minWidth={50}
      minHeight={30}
      enableResizing={isSelected}
      disableDragging={isEditing}
      onDragStop={(_e, d) => onPositionChange?.(d.x, d.y)}
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
        contentEditable={isEditing}
        onDoubleClick={handleDoubleClick}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onBlur={handleBlur}
        className="p-2 outline-none whitespace-nowrap cursor-move touch-manipulation"
        style={{
          fontFamily: font,
          color: color,
          fontSize: `${fontSize}px`,
          fontWeight: isBold ? 'bold' : 'normal',
          fontStyle: isItalic ? 'italic' : 'normal',
          textTransform: isUppercase ? 'uppercase' : 'none',
          textAlign: textAlign,
          cursor: isEditing ? 'text' : 'move',
          minWidth: '100px',
          WebkitUserSelect: 'none',
          userSelect: 'none',
        }}
        suppressContentEditableWarning
      >
        {text}
      </div>
    </Rnd>
  );
};
