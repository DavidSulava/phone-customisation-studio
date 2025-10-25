import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { tabs } from './components/tabs';
import { Suspense } from 'react';

export const LeftSection = () => {
  const [activeTab, setActiveTab] = useState('product');

  return (
    <div className="w-full p-2 hidden md:block">
      <Tabs
        defaultValue="product"
        className="w-full"
        onValueChange={setActiveTab}
        value={activeTab}
      >
        <TooltipProvider>
          <TabsList className="grid w-full grid-cols-5 mb-4">
            {tabs.map(({ value, icon: Icon, tooltip }) => (
              <Tooltip key={value}>
                <TooltipTrigger asChild>
                  <TabsTrigger
                    value={value}
                    className={cn(
                      'transition-all duration-200',
                      activeTab === value &&
                        'bg-gradient-to-r from-blue-600 to-purple-600'
                    )}
                  >
                    <Icon
                      className={cn(
                        'h-5 w-5 transition-colors',
                        activeTab === value && 'text-white'
                      )}
                    />
                  </TabsTrigger>
                </TooltipTrigger>
                <TooltipContent>{tooltip}</TooltipContent>
              </Tooltip>
            ))}
          </TabsList>
        </TooltipProvider>

        {tabs.map(({ value, content: Content }) => (
          <TabsContent key={value} value={value}>
            <Content />
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};
