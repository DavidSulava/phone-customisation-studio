import { Button } from '@/components/ui/button';
import { useEditor } from '@/contexts/EditorContext';
import {
  Check,
  Crop,
  FlipHorizontal,
  FlipVertical,
  Maximize,
  RefreshCcw,
  Sliders,
  Trash,
  X,
} from 'lucide-react';

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Slider } from '@/components/ui/slider';
import { cn } from '@/lib/utils';
import { ImageEffects } from '@/types';
import Image from 'next/image';
import { Separator } from '@/components/ui/separator';
import { ImageControls } from './ImageControls';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';

export const ImageOptions = () => {
  const {
    originalImage,
    isResizeMode,
    croppedImage,
    imageEffects,
    scale,
    rotation,
    flipHorizontal,
    flipVertical,

    keepChanges,
    startResizeMode,
    updateImageEffects,
    setScale,
    setRotation,
    setFlipHorizontal,
    setFlipVertical,
    resetImageTransforms,
    resetAll,
  } = useEditor();

  const hasImage = Boolean(originalImage);
  const isCropped = Boolean(croppedImage);

  const handleResetEffects = () => {
    Object.keys(imageEffects).forEach((effect) => {
      updateImageEffects({
        [effect]: effect === 'blur' || effect === 'hue' ? 0 : 100,
      });
    });
  };

  if (!hasImage) return null;

  return (
    <div className="absolute top-4 left-1/2 -translate-x-1/2 flex items-center gap-1 bg-background border rounded-full p-2 shadow-lg lg:hidden z-50">
      {isResizeMode ? (
        <Button
          onClick={hasImage ? keepChanges : () => {}}
          disabled={!hasImage}
          variant="ghost"
          size="icon"
          className="h-10 w-10 rounded-full"
        >
          <Check className="w-4 h-4" />
        </Button>
      ) : (
        <Button
          onClick={hasImage ? startResizeMode : () => {}}
          disabled={!hasImage}
          variant="ghost"
          size="icon"
          className="h-10 w-10 rounded-full"
        >
          <Crop className="w-4 h-4" />
        </Button>
      )}

      <Separator orientation="vertical" className="h-7" />
      {/* Image transform controls */}

      <HoverCard>
        <HoverCardTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="h-10 w-10 rounded-full"
            disabled={isCropped || !isResizeMode || !hasImage}
            title="Scale"
          >
            <Maximize className="w-4 h-4" />
          </Button>
        </HoverCardTrigger>
        <HoverCardContent>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500 mr-2">
              {scale.toFixed(1)}x
            </span>
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
        </HoverCardContent>
      </HoverCard>

      <HoverCard>
        <HoverCardTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="h-10 w-10 rounded-full"
            disabled={isCropped || !isResizeMode || !hasImage}
            title="Rotate"
          >
            <RefreshCcw className="w-4 h-4" />
          </Button>
        </HoverCardTrigger>
        <HoverCardContent>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500 mr-2">{rotation}°</span>

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
        </HoverCardContent>
      </HoverCard>

      <Button
        variant="ghost"
        size="icon"
        className="h-10 w-10 rounded-full"
        disabled={isCropped || !isResizeMode || !hasImage}
        onClick={() => setFlipHorizontal(!flipHorizontal)}
        title="Flip Horizontal"
      >
        <FlipHorizontal
          className={cn('w-4 h-4', flipHorizontal && 'text-blue-600')}
        />
      </Button>

      <Button
        variant="ghost"
        size="icon"
        className="h-10 w-10 rounded-full"
        disabled={isCropped || !isResizeMode || !hasImage}
        onClick={() => setFlipVertical(!flipVertical)}
        title="Flip Vertical"
      >
        <FlipVertical
          className={cn('w-4 h-4', flipVertical && 'text-blue-600')}
        />
      </Button>

      <Button
        variant="secondary"
        size="sm"
        className="h-8 px-2 rounded-full text-red-500"
        disabled={!hasImage}
        onClick={resetImageTransforms}
        title="Reset Transforms"
      >
        <X className="w-4 h-4" />
      </Button>

      <Separator orientation="vertical" className="h-7" />

      <ImageEffectsDrawer
        isResizeMode={isResizeMode}
        hasImage={hasImage}
        isCropped={isCropped}
        imageEffects={imageEffects}
        updateImageEffects={updateImageEffects}
        originalImage={originalImage}
        handleResetEffects={handleResetEffects}
      />

      <Separator orientation="vertical" className="h-7" />
      <Button
        variant="ghost"
        size="icon"
        className="h-10 w-10 rounded-full text-red-500"
        title="Clear Image"
        disabled={!hasImage}
        onClick={hasImage ? resetAll : () => {}}
      >
        <Trash className="w-4 h-4" />
      </Button>
    </div>
  );
};

interface ImageEffectsDrawerProps {
  isResizeMode: boolean;
  hasImage: boolean;
  isCropped: boolean;
  imageEffects: ImageEffects;
  updateImageEffects: (effects: Partial<ImageEffects>) => void;
  originalImage: string | null;
  handleResetEffects: () => void;
}

export function ImageEffectsDrawer({
  isResizeMode,
  hasImage,
  isCropped,
  imageEffects,
  originalImage,
}: ImageEffectsDrawerProps) {
  const generateFilterString = (effects: typeof imageEffects) => {
    return `
      opacity(${effects.opacity}%)
      brightness(${effects.brightness}%)
      contrast(${effects.contrast}%)
      saturate(${effects.saturation}%)
      blur(${effects.blur}px)
      hue-rotate(${effects.hue}deg)
    `;
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="h-10 w-10 disabled:opacity-50 disabled:cursor-not-allowed rounded-full"
          disabled={isResizeMode}
          title="Image Effects"
        >
          <Sliders className="w-4 h-4" />
        </Button>
      </SheetTrigger>
      <SheetContent className="w-[250px] sm:w-[540px]">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <Sliders className="w-5 h-5" />
            Image Controls
          </SheetTitle>
        </SheetHeader>

        <div
          className={cn(
            'space-y-4 py-4',
            (!isCropped || isResizeMode || !hasImage) && 'opacity-50'
          )}
        >
          <div className="relative w-auto h-[200px] overflow-hidden rounded-lg mx-auto">
            {originalImage && (
              <Image
                fill
                src={originalImage}
                alt="Background"
                objectFit="contain"
                className="pointer-events-none"
                draggable={false}
                style={{
                  filter: generateFilterString(imageEffects),
                }}
              />
            )}
          </div>

          {/* Image Controls */}
          <ImageControls hideTransforms={true} />
        </div>
      </SheetContent>
    </Sheet>
  );
}
