'use client';
import { LeftSection } from './LeftSection';
import { MainCanvas } from './MainCanvas';
import { RightSection } from './RightSection';
import { ImageOptions } from './components/ImageOptions';
import { IncludeImageCheckbox } from './components/IncludeImageCheckbox';

export const Editor = () => {
  return (
    <div>
      <IncludeImageCheckbox label="Also download image" />
      <div className="flex-1 flex">
        {/* Left Sidebar */}
        <div className="w-72 border-r bg-background h-[calc(100vh-75px)] overflow-auto hidden lg:block">
          <LeftSection />
        </div>

        {/* Main Canvas */}
        <div className=" relative flex-1 h-[calc(100vh-75px)] overflow-auto flex items-center justify-center bg-gray-100 dark:bg-gray-900">
          <ImageOptions />
          <MainCanvas />
        </div>

        {/* Right Sidebar */}
        <div className="w-[320px] border-l bg-background p-4 h-[calc(100vh-75px)] overflow-auto hidden lg:block">
          <RightSection />
        </div>
      </div>
    </div>
  );
};
