import React from 'react';

interface RightSideButtonsProps {
  frameColor: string;
}

export const RightSideButtons: React.FC<RightSideButtonsProps> = ({
  frameColor,
}) => {
  return (
    <div className="absolute right-[-4px] top-[120px] h-[200px] flex flex-col gap-6 z-40 pointer-events-none">
      {/* Silent Switch */}
      <div
        className="h-7 w-2 rounded-r-md shadow-lg bg-gray-400 dark:bg-gray-600"
        style={{
          backgroundColor: frameColor,
        }}
      />

      {/* Volume Up */}

      <div
        className="h-12 w-2 rounded-r-md shadow-lg bg-gray-400 dark:bg-gray-600"
        style={{
          backgroundColor: frameColor,
        }}
      />

      {/* Volume Down */}

      <div
        className="h-12 w-2 rounded-r-md shadow-lg bg-gray-400 dark:bg-gray-600"
        style={{
          backgroundColor: frameColor,
        }}
      />
    </div>
  );
};
