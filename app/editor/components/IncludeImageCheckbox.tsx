import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { useEditor } from '@/contexts/EditorContext';
import React from 'react';

interface Props {
  label?: string;
}

export const IncludeImageCheckbox = ({ label }: Props) => {
  const { isRemoteImage, downloadWithImage, setDownloadWithImage } =
    useEditor();

  if (!isRemoteImage) return null;

  return (
    <>
      <div className="flex justify-end items-center space-x-2 p-2 lg:hidden">
        <Checkbox
          id="download-with-image"
          checked={downloadWithImage}
          onCheckedChange={(checked: boolean) => setDownloadWithImage(checked)}
        />
        <Label htmlFor="download-with-image">{label || 'Include image'}</Label>
      </div>
    </>
  );
};
