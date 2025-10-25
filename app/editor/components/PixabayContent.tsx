import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useEditor } from '@/contexts/EditorContext';
import { useDebounce } from '@/hooks/use-debounce';
import {
  PixabayImage,
  PixabayImageType,
  searchPixabayImages,
} from '@/lib/pixabay';
import { Search } from 'lucide-react';
import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';

export const PixabayContent = () => {
  const {
    setOriginalImage,
    setIsResizeMode,
    setIsRemoteImage,
    setImagePosition,
  } = useEditor();
  const [activeTab, setActiveTab] = useState<PixabayImageType>('photo');
  const [searchQuery, setSearchQuery] = useState('');
  const [images, setImages] = useState<PixabayImage[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  const debouncedSearch = useDebounce(searchQuery, 1000);

  const fetchImages = useCallback(async () => {
    try {
      setLoading(true);
      const response = await searchPixabayImages(
        debouncedSearch,
        activeTab,
        page
      );
      setImages((prev) =>
        page === 1 ? response.hits : [...prev, ...response.hits]
      );
    } catch (error) {
      console.error('Failed to fetch images:', error);
    } finally {
      setLoading(false);
    }
  }, [debouncedSearch, activeTab, page]);

  const loadMore = () => {
    setPage((prev) => prev + 1);
  };

  useEffect(() => {
    setPage(1);
    fetchImages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearch, activeTab]);

  const handlePixabayImageSelect = (image: PixabayImage) => {
    const img = document.createElement('img');
    img.onload = () => {
      const aspectRatio = img.width / img.height;
      let width = 300; // Start with fixed width
      let height = width / aspectRatio;

      // If height is too large, scale down based on max height
      if (height > 500) {
        height = 500;
        width = height * aspectRatio;
      }

      // If width becomes too large after height adjustment
      if (width > 400) {
        width = 400;
        height = width / aspectRatio;
      }

      // Center the image in the container
      const containerWidth = 320; // Fixed container width
      const containerHeight = 600; // Fixed container height
      const x = (containerWidth - width) / 2;
      const y = (containerHeight - height) / 2;

      setImagePosition({
        x,
        y,
        width,
        height,
      });

      setOriginalImage(image.largeImageURL);
      setIsResizeMode(true);
      setIsRemoteImage(true);
    };
    img.src = image.largeImageURL;
  };

  return (
    <div className="space-y-4">
      <Tabs
        value={activeTab}
        onValueChange={(value) => setActiveTab(value as PixabayImageType)}
      >
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="photo">Photos</TabsTrigger>
          <TabsTrigger value="vector">Vectors</TabsTrigger>
          <TabsTrigger value="illustration">Illustrations</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="relative">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search images..."
          className="pl-8"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <ScrollArea className="h-[400px] px-4">
        <div className="grid grid-cols-2 gap-2">
          {images.map((image) => (
            <button
              key={image.id}
              className="relative aspect-square overflow-hidden rounded-lg border bg-muted hover:bg-muted/80 transition-colors"
              onClick={() => handlePixabayImageSelect(image)}
            >
              <Image
                src={image.previewURL}
                alt={image.tags}
                fill
                objectFit="cover"
              />
            </button>
          ))}
        </div>
        {images.length > 0 && (
          <Button
            variant="outline"
            className="w-full mt-4"
            onClick={loadMore}
            disabled={loading}
          >
            {loading ? 'Loading...' : 'Load More'}
          </Button>
        )}
      </ScrollArea>
    </div>
  );
};
