import { useEditor } from '@/contexts/EditorContext';
import { cn } from '@/lib/utils';
import { Image as ImageIcon, Upload } from 'lucide-react';
import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { PixabayContent } from '../../components/PixabayContent';

export const UploadsTab = () => {
  const {
    setOriginalImage,
    setImagePosition,
    setIsResizeMode,
    setIsRemoteImage,
  } = useEditor();

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (!file) return;

      setIsRemoteImage(false);

      const reader = new FileReader();
      reader.onload = (e) => {
        const img = document.createElement('img');
        img.src = e.target?.result as string;

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

          setOriginalImage(e.target?.result as string);
          setIsResizeMode(true);
        };
      };
      reader.readAsDataURL(file);
    },
    [setOriginalImage, setImagePosition, setIsResizeMode, setIsRemoteImage]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg'],
    },
    maxFiles: 1,
    multiple: false,
  });

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h4 className="text-sm font-medium flex items-center gap-2">
          <Upload className="w-4 h-4" />
          Upload Image
        </h4>

        <div
          {...getRootProps()}
          className={cn(
            'dropzone cursor-pointer w-full rounded-lg border-2 border-dashed transition-colors',
            isDragActive
              ? 'border-primary bg-primary/5'
              : 'border-muted-foreground/25 hover:border-primary'
          )}
        >
          <input {...getInputProps()} />
          <div className="flex flex-col items-center justify-center gap-2 p-8">
            <div className="rounded-full bg-primary/10 p-4">
              <ImageIcon className="h-8 w-8 text-primary" />
            </div>
            <div className="text-center">
              <p className="text-sm font-medium">
                {isDragActive
                  ? 'Drop your image here'
                  : 'Drag & drop your image here'}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                PNG, JPG up to 10MB
              </p>
            </div>
          </div>
        </div>
      </div>

      <PixabayContent />
    </div>
  );
};
