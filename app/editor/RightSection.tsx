import { useEditor } from '@/contexts/EditorContext';
import { cn } from '@/lib/utils';
import { Crop, Trash2 } from 'lucide-react';
import { ImageControls } from './components/ImageControls';

export const RightSection = () => {
  const {
    originalImage,
    croppedImage,
    isResizeMode,
    startResizeMode,
    keepChanges,
    resetAll,
  } = useEditor();

  const hasImage = Boolean(originalImage);
  const isCropped = Boolean(croppedImage);

  return (
    <div className="w-full p-2">
      <div className="flex flex-col gap-6">
        {/* Header with clear button */}
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Image Controls</h3>

          <button
            onClick={hasImage ? resetAll : () => {}}
            className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
            title="Clear Image"
            disabled={!hasImage}
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>

        <>
          {/* Resize Controls */}
          <div className={cn('space-y-4', !hasImage && 'opacity-30')}>
            {isResizeMode ? (
              <button
                onClick={hasImage ? keepChanges : () => {}}
                disabled={!hasImage}
                className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full hover:opacity-90 transition-opacity flex items-center justify-center gap-2 font-medium disabled:cursor-not-allowed"
              >
                <Crop className="w-4 h-4" />
                Keep Changes
              </button>
            ) : (
              <button
                onClick={hasImage ? startResizeMode : () => {}}
                className="w-full py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full hover:opacity-90 transition-opacity flex items-center justify-center gap-2 font-medium disabled:cursor-not-allowed"
                disabled={!hasImage}
              >
                <Crop className="w-4 h-4" />
                Resize Image
              </button>
            )}
          </div>

          {/* Image Controls */}
          <ImageControls />
        </>
      </div>
    </div>
  );
};
