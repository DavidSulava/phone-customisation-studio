'use client';
import { PhoneCaseBg } from '@/components/PhoneCaseBg';
import { IPhoneCase } from '@/components/phone-cases/iphone/Iphone';
import { SamsungCase } from '@/components/phone-cases/samsung/Samsung';
import { smallerSizeModels } from '@/constants';
import { useEditor } from '@/contexts/EditorContext';
import { cn } from '@/lib/utils';
import { IPhoneModel, PhoneModel, SamsungModel } from '@/types';
import { forwardRef } from 'react';

export const MainCanvas = forwardRef<HTMLDivElement>(() => {
  const {
    frameColor,
    cameraColor,
    isResizeMode,
    selectText,
    selectClipArt,
    phoneBrand,
    phoneModel,
  } = useEditor();

  const handleContainerClick = () => {
    selectText(null);
    selectClipArt(null);
  };

  return (
    <div
      onClick={handleContainerClick}
      className="w-full h-full lg:w-[90%] lg:h-[90%] p-3 border border-dashed border-gray-400 dark:border-gray-700 rounded-lg overflow-hidden flex items-center justify-center"
    >
      <div id="phone-case-container">
        {phoneBrand === 'iphone' && (
          <div
            className={cn(
              'rounded-[2rem] p-[10px]',
              smallerSizeModels.includes(phoneModel as PhoneModel)
                ? 'w-[300px] h-[550px]'
                : 'w-[320px] h-[580px]'
            )}
          >
            <IPhoneCase
              model={phoneModel as IPhoneModel}
              cameraColor={cameraColor}
              isResizeMode={isResizeMode}
              frameColor={frameColor}
            >
              <PhoneCaseBg />
            </IPhoneCase>
          </div>
        )}

        {phoneBrand === 'samsung' && (
          <div className={cn('rounded-[2rem] p-[10px]', 'w-[300px] h-[580px]')}>
            <SamsungCase
              model={phoneModel as SamsungModel}
              cameraColor={cameraColor}
              isResizeMode={isResizeMode}
              frameColor={frameColor}
              radius={1.5}
            >
              <PhoneCaseBg />
            </SamsungCase>
          </div>
        )}
      </div>
    </div>
  );
});

MainCanvas.displayName = 'MainCanvas';
