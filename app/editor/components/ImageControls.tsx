import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { useEditor } from '@/contexts/EditorContext';
import { cn } from '@/lib/utils';
import {
  FlipHorizontal,
  FlipVertical,
  Maximize,
  RotateCcw,
  Sliders,
} from 'lucide-react';

export const ImageControls = ({
  hideTransforms = false,
}: {
  hideTransforms?: boolean;
}) => {
  const {
    originalImage,
    croppedImage,
    isResizeMode,
    imageEffects,
    updateImageEffects,
    scale,
    setScale,
    rotation,
    setRotation,
    flipHorizontal,
    flipVertical,
    setFlipHorizontal,
    setFlipVertical,
    resetImageTransforms,
    resetImageEffects,
  } = useEditor();

  const handleEffectChange = (
    effect: keyof typeof imageEffects,
    value: number
  ) => {
    updateImageEffects({ [effect]: value });
  };

  const hasImage = Boolean(originalImage);
  const isCropped = Boolean(croppedImage);

  return (
    <>
      {/* Transform Controls */}
      {!hideTransforms && (
        <div
          className={cn(
            'space-y-4',
            (isCropped || !isResizeMode || !hasImage) && 'opacity-50'
          )}
        >
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-medium flex items-center gap-2">
              <Maximize className="w-4 h-4" />
              Transform
            </h4>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 px-2"
              disabled={isCropped || !isResizeMode || !hasImage}
              onClick={resetImageTransforms}
              title="Reset Transforms"
            >
              <RotateCcw className="w-4 h-4" />
            </Button>
          </div>

          {/* Scale Control */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm">Scale</span>
              <span className="text-sm text-gray-500">{scale.toFixed(1)}x</span>
            </div>
            <Slider
              disabled={isCropped || !isResizeMode || !hasImage}
              value={[scale]}
              min={0.1}
              max={3}
              step={0.1}
              className="w-full [&>[role=slider]]:bg-gradient-to-r [&>[role=slider]]:from-blue-600 [&>[role=slider]]:to-purple-600 disabled:cursor-not-allowed"
              onValueChange={([value]) => setScale(value)}
            />
          </div>

          {/* Rotation Control */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm">Rotation</span>
              <span className="text-sm text-gray-500">{rotation}°</span>
            </div>
            <Slider
              disabled={isCropped || !isResizeMode || !hasImage}
              value={[rotation]}
              min={-180}
              max={180}
              step={1}
              className="w-full [&>[role=slider]]:bg-gradient-to-r [&>[role=slider]]:from-blue-600 [&>[role=slider]]:to-purple-600 disabled:cursor-not-allowed"
              onValueChange={([value]) => setRotation(value)}
            />
          </div>

          {/* Flip Controls */}
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              className="flex-1"
              disabled={isCropped || !isResizeMode || !hasImage}
              onClick={() => setFlipHorizontal(!flipHorizontal)}
              title="Flip Horizontal"
            >
              <FlipHorizontal
                className={cn('w-4 h-4', flipHorizontal && 'text-blue-600')}
              />
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="flex-1"
              disabled={isCropped || !isResizeMode || !hasImage}
              onClick={() => setFlipVertical(!flipVertical)}
              title="Flip Vertical"
            >
              <FlipVertical
                className={cn('w-4 h-4', flipVertical && 'text-blue-600')}
              />
            </Button>
          </div>
        </div>
      )}

      {/* Image Effects Controls */}
      <div
        className={cn(
          'space-y-4',
          (!isCropped || isResizeMode || !hasImage) && 'opacity-50'
        )}
      >
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-medium flex items-center gap-2">
            <Sliders className="w-4 h-4" />
            Image Effects
          </h4>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 px-2"
            disabled={!isCropped || isResizeMode || !hasImage}
            onClick={resetImageEffects}
            title="Reset Effects"
          >
            <RotateCcw className="w-4 h-4" />
          </Button>
        </div>

        {Object.entries(imageEffects).map(([effect, value]) => (
          <div key={effect} className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm capitalize">{effect}</span>
              <span className="text-sm text-gray-500">{value}%</span>
            </div>
            <Slider
              disabled={!isCropped || isResizeMode || !hasImage}
              value={[value]}
              min={0}
              max={effect === 'blur' ? 20 : 200}
              step={1}
              className="w-full [&>[role=slider]]:bg-gradient-to-r [&>[role=slider]]:from-blue-600 [&>[role=slider]]:to-purple-600 disabled:cursor-not-allowed"
              onValueChange={([newValue]) =>
                handleEffectChange(
                  effect as keyof typeof imageEffects,
                  newValue
                )
              }
            />
          </div>
        ))}
      </div>
    </>
  );
};
