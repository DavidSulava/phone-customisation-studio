import React from 'react';

interface LeftSideButtonsProps {
  frameColor: string;
}

export const LeftSideButtons: React.FC<LeftSideButtonsProps> = ({
  frameColor,
}) => {
  return (
    <div className="absolute left-[-4px] top-[100px]  z-40 flex flex-col gap-6 pointer-events-none">
      <div
        className="h-20 w-2 rounded-l-md shadow-lg bg-gray-400 dark:bg-gray-600"
        style={{
          backgroundColor: frameColor,
        }}
      />

      <div
        className="h-10 w-2 rounded-l-md shadow-lg bg-gray-400 dark:bg-gray-600"
        style={{
          backgroundColor: frameColor,
        }}
      />
    </div>
  );
};
