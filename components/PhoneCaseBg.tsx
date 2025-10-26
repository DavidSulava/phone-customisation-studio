'use client';
import { useEditor } from '@/contexts/EditorContext';
import Image from 'next/image';
import { Rnd } from 'react-rnd';
import {
  ResizeControl,
  ResizeControlBottom,
  ResizeControlLeft,
  ResizeControlRight,
  ResizeControlTop,
} from './ResizeControl';
import { TextElement } from './TextElement';
import { ClipArtElement } from './ClipArtElement';

const config = require('@/next.config');

export const PhoneCaseBg = () => {
  const {
    originalImage,
    croppedImage,
    isResizeMode,
    imagePosition,
    setImagePosition,
    scale,
    rotation,
    imageEffects,
    backgroundColor,
    textElements,
    selectedTextId,
    clipArtElements,
    selectedClipArtId,
    updateTextPosition,
    updateTextContent,
    selectText,
    removeText,
    updateClipArtPosition,
    updateClipArtTransform,
    selectClipArt,
    removeClipArt,
    flipHorizontal,
    flipVertical,
    containerRef,
  } = useEditor();

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

  const currentImage = isResizeMode
    ? originalImage
    : croppedImage || originalImage;

  const handleContainerClick = () => {
    selectText(null);
    selectClipArt(null);
  };

  return (
    <div
      ref={containerRef}
      className="phone-case-bg-container absolute top-0 left-0 w-full z-10 h-full rounded-[2rem]"
      style={{
        backgroundColor,
        overflow: isResizeMode ? 'visible' : 'hidden',
      }}
      onClick={handleContainerClick}
    >
      {currentImage ? (
        <>
          <Rnd
            position={{ x: imagePosition.x, y: imagePosition.y }}
            size={{
              width: imagePosition.width * scale,
              height: imagePosition.height * scale,
            }}
            lockAspectRatio
            disableDragging={!isResizeMode}
            enableResizing={isResizeMode}
            onDragStop={(e, d) => {
              setImagePosition({
                ...imagePosition,
                x: d.x,
                y: d.y,
              });
            }}
            onResize={(_e, _direction, ref, _delta, position) => {
              setImagePosition({
                x: position.x,
                y: position.y,
                width: ref.offsetWidth / scale,
                height: ref.offsetHeight / scale,
              });
            }}
            resizeHandleComponent={
              isResizeMode
                ? {
                    topLeft: <ResizeControl />,
                    topRight: <ResizeControl />,
                    bottomLeft: <ResizeControl />,
                    bottomRight: <ResizeControl />,
                    top: <ResizeControlTop />,
                    bottom: <ResizeControlBottom />,
                    left: <ResizeControlLeft />,
                    right: <ResizeControlRight />,
                  }
                : {}
            }
            className={`${isResizeMode ? 'ring-2 ring-blue-500' : ''} relative`}
          >
            <div
              className="relative w-full h-full"
              style={{
                transform: `scale(${flipHorizontal ? -1 : 1}, ${
                  flipVertical ? -1 : 1
                }) rotate(${rotation}deg)`,
                transformOrigin: 'center center',
              }}
            >
              <Image
                fill
                src={config.basePath + currentImage}
                alt="Background"
                className="pointer-events-none"
                draggable={false}
                style={{
                  filter: generateFilterString(imageEffects),
                }}
              />
            </div>
          </Rnd>
        </>
      ) : null}

      {/* Clip Art Elements */}
      {clipArtElements.map((element) => (
        <ClipArtElement
          key={element.id}
          {...element}
          isSelected={selectedClipArtId === element.id}
          onSelect={() => selectClipArt(element.id)}
          onPositionChange={(x, y) =>
            updateClipArtPosition(element.id, { x, y })
          }
          onTransformChange={(scale, rotation) =>
            updateClipArtTransform(element.id, scale, rotation)
          }
          onRemove={() => removeClipArt(element.id)}
        />
      ))}

      {/* Text Elements */}
      {textElements.map((element) => (
        <TextElement
          key={element.id}
          {...element}
          isSelected={selectedTextId === element.id}
          onSelect={() => selectText(element.id)}
          onPositionChange={(x, y) => updateTextPosition(element.id, { x, y })}
          onTextChange={(text) => updateTextContent(element.id, text)}
          onRemove={() => removeText(element.id)}
        />
      ))}
    </div>
  );
};
