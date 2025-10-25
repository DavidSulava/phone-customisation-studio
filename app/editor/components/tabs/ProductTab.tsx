import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useEditor } from '@/contexts/EditorContext';
import { cn } from '@/lib/utils';
import { PhoneBrand, PhoneModel } from '@/types';
import { Check, ChevronsUpDown, Paintbrush, Smartphone } from 'lucide-react';
import React, { useEffect } from 'react';
import { allProducts } from '../../../../constants';
import { Input } from '@/components/ui/input';
import { CirclePicker } from 'react-color';
import { useRouter, useSearchParams } from 'next/navigation';

export const ProductTab = () => {
  const {
    phoneBrand,
    phoneModel,
    backgroundColor,
    setPhoneBrand,
    setPhoneModel,
    setBackgroundColor,
    setCameraColor,
    setFrameColor,
  } = useEditor();
  const [open, setOpen] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState('');
  const router = useRouter();
  const searchParams = useSearchParams();

  const selectedProducts = allProducts[phoneBrand];

  const selectedProductDefaultColors = selectedProducts.find(
    (product) => product.model === phoneModel
  )?.defaultColors;

  const initializeColors = (brand: PhoneBrand, model: PhoneModel) => {
    const product = allProducts[brand].find((p) => p.model === model);
    const defaultColor = product?.defaultColors?.[0] || '#ffffff';
    setBackgroundColor(defaultColor);
    setCameraColor(defaultColor);
    setFrameColor(defaultColor);
  };

  const updateSearchParams = (brand: PhoneBrand, model: PhoneModel) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('brand', brand);
    params.set('model', model);
    router.replace(`?${params.toString()}`, { scroll: false });
  };

  useEffect(() => {
    if (phoneBrand && phoneModel) {
      initializeColors(phoneBrand, phoneModel);
      updateSearchParams(phoneBrand, phoneModel);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phoneBrand, phoneModel]);

  useEffect(() => {
    const brand = searchParams.get('brand') as PhoneBrand;
    const model = searchParams.get('model') as PhoneModel;

    if (brand && model && allProducts[brand]?.some((p) => p.model === model)) {
      setPhoneBrand(brand);
      setPhoneModel(model);
      initializeColors(brand, model);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h4 className="text-sm font-medium flex items-center gap-2">
          <Smartphone className="w-4 h-4" />
          Select Product
        </h4>

        <div className="grid grid-cols-2 gap-2">
          {Object.keys(allProducts).map((brand) => (
            <Button
              key={brand}
              variant="outline"
              className={cn(
                'h-20 flex flex-col gap-1',
                phoneBrand === brand && 'border border-primary text-primary'
              )}
              onClick={() => {
                const brandKey = brand as PhoneBrand;
                const firstModel = allProducts[brandKey][0].model;
                setPhoneBrand(brandKey);
                setPhoneModel(firstModel);
                initializeColors(brandKey, firstModel);
                updateSearchParams(brandKey, firstModel);
              }}
            >
              <Smartphone className="w-8 h-8" />
              <span className="text-xs">
                {brand.charAt(0).toUpperCase() + brand.slice(1)}
              </span>
            </Button>
          ))}
        </div>

        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="w-full justify-between"
            >
              {phoneModel
                ? selectedProducts.find(
                    (product) => product.model === phoneModel
                  )?.name
                : 'Select product...'}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-full p-0 z-[1000]" modal>
            <Command shouldFilter={false}>
              <Input
                placeholder="Search product..."
                className="h-9"
                value={searchTerm}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setSearchTerm(e.target.value)
                }
              />
              <CommandEmpty>No product found.</CommandEmpty>
              <CommandGroup>
                <ScrollArea className="h-[200px]">
                  {selectedProducts
                    .filter((product) =>
                      product.name
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase())
                    )
                    .map((product) => (
                      <CommandItem
                        key={product.model}
                        value={product.model}
                        onSelect={(currentValue: string) => {
                          const modelKey = currentValue as PhoneModel;
                          setPhoneModel(modelKey);
                          initializeColors(phoneBrand, modelKey);
                          updateSearchParams(phoneBrand, modelKey);
                          setOpen(false);
                        }}
                      >
                        <Check
                          className={cn(
                            'mr-2 h-4 w-4',
                            phoneModel === product.model
                              ? 'opacity-100'
                              : 'opacity-0'
                          )}
                        />
                        {product.name}
                      </CommandItem>
                    ))}
                </ScrollArea>
              </CommandGroup>
            </Command>
          </PopoverContent>
        </Popover>

        {selectedProductDefaultColors && (
          <div className="space-y-2">
            <p className="text-sm font-medium">Colors</p>
            <CirclePicker
              colors={selectedProductDefaultColors}
              color={backgroundColor}
              onChange={(color) => {
                setBackgroundColor(color.hex);
                setCameraColor(color.hex);
                setFrameColor(color.hex);
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};
