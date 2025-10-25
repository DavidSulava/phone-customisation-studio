import React from 'react';

interface LeftSideButtonsProps {
  frameColor: string;
}

export const LeftSideButtons: React.FC<LeftSideButtonsProps> = ({
  frameColor,
}) => {
  return (
    <div className="absolute left-[-4px] top-[150px] h-16 z-40 pointer-events-none">
      <div
        className="h-full w-2 rounded-l-md shadow-lg bg-gray-400 dark:bg-gray-600"
        style={{
          backgroundColor: frameColor,
        }}
      />
    </div>
  );
};
