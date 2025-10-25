import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { useState } from 'react';
import { tabs } from './tabs';

export const EditorDrawer = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState<string | null>(null);

  const selectedTabData = tabs.find((tab) => tab.value === selectedTab);

  const handleTabClick = (value: string) => {
    setSelectedTab(value);
    setIsOpen(true);
  };

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-background border rounded-full p-2 shadow-lg lg:hidden z-50">
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        {tabs.map(({ value, icon: Icon }) => (
          <Button
            key={value}
            variant="ghost"
            size="icon"
            className="h-10 w-10"
            onClick={() => handleTabClick(value)}
          >
            <Icon className="h-5 w-5" />
          </Button>
        ))}
        {selectedTabData && (
          <SheetContent side="bottom" className="h-[50vh]">
            <SheetHeader>
              <SheetTitle className="flex items-center gap-2">
                <selectedTabData.icon className="h-5 w-5" />
                {selectedTabData.tooltip}
              </SheetTitle>
            </SheetHeader>
            <ScrollArea className="h-[calc(50vh-70px)]">
              <div className="mt-4">
                <selectedTabData.content />
              </div>
            </ScrollArea>
          </SheetContent>
        )}
      </Sheet>
    </div>
  );
};
