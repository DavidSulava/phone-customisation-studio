import { PaintBucket } from 'lucide-react';
import { Sticker, Type, Upload } from 'lucide-react';
import { Smartphone } from 'lucide-react';
import { LucideIcon } from 'lucide-react';

import { ProductTab } from './ProductTab';
import { UploadsTab } from './UploadsTab';
import { TextTab } from './TextTab';
import { ClipArtTab } from './ClipArtTab';
import { FillTab } from './FillTab';

export const tabs: {
  value: string;
  icon: LucideIcon;
  tooltip: string;
  content: React.FC;
}[] = [
  {
    value: 'product',
    icon: Smartphone,
    tooltip: 'Product',
    content: ProductTab,
  },
  {
    value: 'uploads',
    icon: Upload,
    tooltip: 'Uploads',
    content: UploadsTab,
  },
  {
    value: 'text',
    icon: Type,
    tooltip: 'Text',
    content: TextTab,
  },
  {
    value: 'clipart',
    icon: Sticker,
    tooltip: 'Clip Art',
    content: ClipArtTab,
  },
  {
    value: 'fill',
    icon: PaintBucket,
    tooltip: 'Fill',
    content: FillTab,
  },
] satisfies {
  value: string;
  icon: LucideIcon;
  tooltip: string;
  content: React.FC;
}[];

// export { ProductTab };
// export { UploadsTab };
// export { TextTab };
// export { ClipArtTab };
// export { FillTab };
