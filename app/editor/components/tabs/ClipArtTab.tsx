import { Button } from '@/components/ui/button';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { useEditor } from '@/contexts/EditorContext';
import { Sticker, Trash, X } from 'lucide-react';
import Image from 'next/image';

const clipArts = [
  '/cliparts/clipart-1.svg',
  '/cliparts/clipart-2.svg',
  '/cliparts/clipart-3.svg',
  '/cliparts/clipart-4.svg',
  '/cliparts/clipart-5.svg',
  '/cliparts/clipart-6.svg',
  '/cliparts/clipart-7.svg',
  '/cliparts/clipart-8.svg', // Heart
  '/cliparts/clipart-9.svg', // Star
  '/cliparts/clipart-10.svg', // Music Note
  '/cliparts/clipart-11.svg', // Crown
  '/cliparts/clipart-12.svg', // Flower
];

export const ClipArtTab = () => {
  const { addClipArt, clipArtElements, removeClipArt, selectClipArt } =
    useEditor();

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h4 className="text-sm font-medium flex items-center gap-2">
          <Sticker className="w-4 h-4" />
          Clip Art
        </h4>
        <p className="text-sm text-muted-foreground">
          Added clip arts will appear here.
        </p>
        <ScrollArea className="p-2 h-[64px] border border-muted rounded-sm overflow-y-hidden">
          <div className="flex items-center gap-2">
            {clipArtElements.map((element) => (
              <div key={element.id} className=" relative">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => selectClipArt(element.id)}
                >
                  <Image
                    src={element.src}
                    alt="Clipart"
                    fill
                    className="pointer-events-none"
                    style={{ objectFit: 'contain' }}
                  />
                </Button>

                <button
                  onClick={() => removeClipArt(element.id)}
                  className="absolute top-0 -right-2"
                >
                  <Trash className="w-4 h-4 text-red-500" />
                </button>
              </div>
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>

        <p className="text-sm text-muted-foreground">Select a clip art.</p>
        <div className="grid grid-cols-3 gap-2">
          {clipArts.map((src, index) => (
            <button
              key={index}
              onClick={() => addClipArt(src)}
              className="aspect-square bg-muted rounded-lg flex items-center justify-center hover:bg-muted/80 transition-colors relative overflow-hidden"
            >
              <Image
                src={src}
                alt={`Clipart ${index + 1}`}
                fill
                className="p-2"
                style={{ objectFit: 'contain' }}
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
