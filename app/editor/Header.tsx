import { Logo } from '@/components/Logo';
import { ThemeToggle } from '@/components/ThemeToggle';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useEditor } from '@/contexts/EditorContext';
import { Download } from 'lucide-react';
import { useCallback } from 'react';
import { IncludeImageCheckbox } from './components/IncludeImageCheckbox';

export const Header = () => {
  const { downloadDesign, isResizeMode, selectedClipArtId, selectedTextId } =
    useEditor();

  const handleDownload = useCallback(async () => {
    try {
      await downloadDesign();
    } catch (error) {
      console.error('Failed to download design:', error);
    }
  }, [downloadDesign]);

  return (
    <div className="border-b p-4 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Logo />
      </div>
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-2">
          <div className="hidden lg:block">
            <IncludeImageCheckbox />
          </div>

          <Button
            onClick={handleDownload}
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:opacity-90 transition-opacity"
            disabled={
              isResizeMode ||
              selectedClipArtId !== null ||
              selectedTextId !== null
            }
          >
            <Download className="h-4 w-4 " />
            <span className="hidden lg:block ml-2" title="Download">
              Download
            </span>
          </Button>
        </div>
        <Separator orientation="vertical" className="mx-2 h-7" />
        <div>
          <ThemeToggle />
        </div>
      </div>
    </div>
  );
};
