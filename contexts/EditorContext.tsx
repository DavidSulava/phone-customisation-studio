'use client';

import { fallbackFonts, getSystemFonts } from '@/lib/font-utils';
import { ImageEffects, PhoneModel, PhoneBrand } from '@/types';
import { useToPng } from '@hugocxl/react-to-image';
import { useSearchParams } from 'next/navigation';
import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';

interface TextElement {
  id: string;
  text: string;
  font: string;
  color: string;
  position: { x: number; y: number };
  fontSize: number;
  isBold: boolean;
  isItalic: boolean;
  isUppercase: boolean;
  textAlign: 'left' | 'center' | 'right';
}

interface ClipArtElement {
  id: string;
  src: string;
  position: { x: number; y: number };
  scale: number;
  rotation: number;
}

interface TextStyle {
  fontSize?: number;
  isBold?: boolean;
  isItalic?: boolean;
  isUppercase?: boolean;
  textAlign?: 'left' | 'center' | 'right';
}

interface ImagePosition {
  x: number;
  y: number;
  width: number;
  height: number;
}

interface GoogleFont {
  family: string;
  link: string;
}

interface EditorContextType {
  originalImage: string | null;
  croppedImage: string | null;
  isResizeMode: boolean;
  imagePosition: ImagePosition;
  scale: number;
  rotation: number;
  flipHorizontal: boolean;
  flipVertical: boolean;
  textElements: TextElement[];
  clipArtElements: ClipArtElement[];
  selectedTextId: string | null;
  selectedClipArtId: string | null;
  containerRef: React.RefObject<HTMLDivElement | null>;
  isRemoteImage: boolean;
  imageEffects: ImageEffects;
  backgroundColor: string;
  frameColor: string;
  cameraColor: string;
  googleFonts: GoogleFont[];
  systemFonts: string[];
  downloadWithImage: boolean;
  phoneBrand: PhoneBrand;
  phoneModel: PhoneModel;
  setPhoneBrand: (phoneBrand: PhoneBrand) => void;
  setPhoneModel: (phoneModel: PhoneModel) => void;
  setImagePosition: (position: ImagePosition) => void;
  setOriginalImage: (image: string | null) => void;
  setCroppedImage: (image: string | null) => void;
  setIsResizeMode: (isResizeMode: boolean) => void;
  setScale: (scale: number) => void;
  setRotation: (rotation: number) => void;
  setFlipHorizontal: (flip: boolean) => void;
  setFlipVertical: (flip: boolean) => void;
  resetImageTransforms: () => void;
  resetImageEffects: () => void;
  resetAll: () => void;
  setIsRemoteImage: (isRemoteImage: boolean) => void;
  addText: () => void;
  updateTextPosition: (id: string, position: { x: number; y: number }) => void;
  updateTextContent: (id: string, text: string) => void;
  updateTextFont: (id: string, font: string) => void;
  updateTextColor: (id: string, color: string) => void;
  updateTextStyle: (id: string, style: TextStyle) => void;
  removeText: (id: string) => void;
  selectText: (id: string | null) => void;
  updateImageEffects: (effects: Partial<ImageEffects>) => void;
  downloadDesign: () => Promise<void>;
  startResizeMode: () => void;
  keepChanges: () => void;
  setBackgroundColor: (color: string) => void;
  setFrameColor: (color: string) => void;
  setCameraColor: (color: string) => void;
  addGoogleFont: (font: GoogleFont) => void;
  loadSystemFonts: () => Promise<void>;
  setDownloadWithImage: (downloadWithImage: boolean) => void;
  addClipArt: (src: string) => void;
  updateClipArtPosition: (
    id: string,
    position: { x: number; y: number }
  ) => void;
  updateClipArtTransform: (id: string, scale: number, rotation: number) => void;
  removeClipArt: (id: string) => void;
  selectClipArt: (id: string | null) => void;
}

const defaultImageEffects: ImageEffects = {
  opacity: 100,
  brightness: 100,
  contrast: 100,
  saturation: 100,
  blur: 0,
  hue: 0,
};

export const EditorContext = createContext<EditorContextType | null>(null);

export function EditorProvider({ children }: { children: React.ReactNode }) {
  const searchParams = useSearchParams();
  const brand = searchParams.get('brand') || 'iphone';
  const model = searchParams.get('model') || '16promax';
  const containerRef = useRef<HTMLDivElement>(null);
  const [_state, convertToPng] = useToPng<HTMLDivElement>({
    selector: '#phone-case-container',
    quality: 1.0,
    style: {
      transform: 'scale(1)',
    },
    onSuccess: (data) => {
      handleDownload(data);
    },
  });
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [croppedImage, setCroppedImage] = useState<string | null>(null);
  const [isResizeMode, setIsResizeMode] = useState(false);
  const [imagePosition, setImagePosition] = useState<ImagePosition>({
    x: 0,
    y: 0,
    width: 400,
    height: 400,
  });
  const [scale, setScale] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [flipHorizontal, setFlipHorizontal] = useState(false);
  const [flipVertical, setFlipVertical] = useState(false);
  const [textElements, setTextElements] = useState<TextElement[]>([]);
  const [selectedTextId, setSelectedTextId] = useState<string | null>(null);
  const [clipArtElements, setClipArtElements] = useState<ClipArtElement[]>([]);
  const [selectedClipArtId, setSelectedClipArtId] = useState<string | null>(
    null
  );
  const [imageEffects, setImageEffects] =
    useState<ImageEffects>(defaultImageEffects);
  const [backgroundColor, setBackgroundColor] = useState('#1b1b1b');
  const [frameColor, setFrameColor] = useState('#1b1b1b');
  const [cameraColor, setCameraColor] = useState('#1b1b1b');
  const [googleFonts, setGoogleFonts] = useState<GoogleFont[]>([]);
  const [systemFonts, setSystemFonts] = useState<string[]>(fallbackFonts);
  const [isRemoteImage, setIsRemoteImage] = useState(false);
  const [downloadWithImage, setDownloadWithImage] = useState(false);
  const [phoneBrand, setPhoneBrand] = useState<PhoneBrand>(brand as PhoneBrand);
  const [phoneModel, setPhoneModel] = useState<PhoneModel>(model as PhoneModel);

  const resetImageTransforms = () => {
    setScale(1);
    setRotation(0);
    setFlipHorizontal(false);
    setFlipVertical(false);
  };

  const resetImageEffects = () => {
    setImageEffects(defaultImageEffects);
  };

  const resetImagePosition = () => {
    setImagePosition({
      x: 0,
      y: 0,
      width: 400,
      height: 400,
    });
  };

  const resetAll = () => {
    resetImageTransforms();
    resetImageEffects();
    resetImagePosition();
    setOriginalImage(null);
    setCroppedImage(null);
    setIsResizeMode(false);
    setIsRemoteImage(false);
  };

  const startResizeMode = () => {
    setCroppedImage(null);
    setIsResizeMode(true);
    // Remove overflow hidden when going back to resize mode
    const containerElement = document.querySelector('.phone-case-bg-container');
    if (containerElement) {
      containerElement.classList.remove('overflow-hidden');
    }
  };

  const keepChanges = () => {
    // Save the current image state
    setCroppedImage(originalImage);
    setIsResizeMode(false);
  };

  const addText = () => {
    const container = containerRef.current;
    const centerX =
      container && container.clientWidth !== 0
        ? (container.clientWidth - 100) / 2
        : 100;
    const centerY =
      container && container.clientHeight !== 0
        ? (container.clientHeight - 30) / 2
        : 220;

    const newText: TextElement = {
      id: Math.random().toString(36).substr(2, 9),
      text: 'Double click/tap to edit',
      font: 'Arial',
      color: '#000000',
      position: { x: centerX, y: centerY },
      fontSize: 16,
      isBold: false,
      isItalic: false,
      isUppercase: false,
      textAlign: 'left',
    };
    setTextElements((prev) => [...prev, newText]);
    setSelectedTextId(newText.id);
  };

  const updateTextPosition = (
    id: string,
    position: { x: number; y: number }
  ) => {
    setTextElements((prev) =>
      prev.map((el) => (el.id === id ? { ...el, position } : el))
    );
  };

  const updateTextContent = (id: string, text: string) => {
    setTextElements((prev) =>
      prev.map((el) => (el.id === id ? { ...el, text } : el))
    );
  };

  const updateTextFont = (id: string, font: string) => {
    setTextElements((prev) =>
      prev.map((el) => (el.id === id ? { ...el, font } : el))
    );
  };

  const updateTextColor = (id: string, color: string) => {
    setTextElements((prev) =>
      prev.map((el) => (el.id === id ? { ...el, color } : el))
    );
  };

  const updateTextStyle = (id: string, style: TextStyle) => {
    setTextElements((prev) =>
      prev.map((el) => (el.id === id ? { ...el, ...style } : el))
    );
  };

  const removeText = (id: string) => {
    setTextElements((prev) => prev.filter((el) => el.id !== id));
    if (selectedTextId === id) {
      setSelectedTextId(null);
    }
  };

  const selectText = (id: string | null) => {
    setSelectedTextId(id);
  };

  const updateImageEffects = (effects: Partial<ImageEffects>) => {
    setImageEffects((prev) => ({ ...prev, ...effects }));
  };

  const generateRandomId = () => {
    return Math.random().toString(36).substring(2, 15);
  };

  const downloadDesign = async () => {
    requestAnimationFrame(async () => {
      await convertToPng();
    });
  };

  const handleDownload = async (data: string) => {
    if (isRemoteImage && downloadWithImage && originalImage) {
      // Create a zip file with both the case and the original image
      const JSZip = (await import('jszip')).default;
      const zip = new JSZip();

      // Add the case image to the zip
      if (data) {
        const base64Data = data.split(',')[1];
        const binaryData = atob(base64Data);
        const array = new Uint8Array(binaryData.length);
        for (let i = 0; i < binaryData.length; i++) {
          array[i] = binaryData.charCodeAt(i);
        }
        const blob = new Blob([array], { type: 'image/png' });
        zip.file(`phone-case-${generateRandomId()}.png`, blob);
      }

      // Add the original image to the zip
      const imageResponse = await fetch(originalImage);
      const imageBlob = await imageResponse.blob();
      zip.file('original-image-' + originalImage.split('/').pop(), imageBlob);

      // Generate and download the zip
      const content = await zip.generateAsync({ type: 'blob' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(content);
      link.download = `phone-case-${generateRandomId()}.zip`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(link.href);
    } else {
      if (data) {
        const link = document.createElement('a');
        link.href = data;
        link.download = `phone-case-${generateRandomId()}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    }

    // Reset the checkbox
    setDownloadWithImage(false);
  };

  const addGoogleFont = (font: GoogleFont) => {
    setGoogleFonts((prev) => [...prev, font]);
  };

  const loadSystemFonts = async () => {
    const fonts = await getSystemFonts();
    setSystemFonts(fonts);
  };

  const addClipArt = (src: string) => {
    const container = containerRef.current;
    const centerX =
      container && container.clientWidth !== 0
        ? (container.clientWidth - 100) / 2
        : 100;
    const centerY =
      container && container.clientHeight !== 0
        ? (container.clientHeight - 100) / 2
        : 300;

    const newClipArt: ClipArtElement = {
      id: Math.random().toString(36).substr(2, 9),
      src,
      position: { x: centerX, y: centerY },
      scale: 1,
      rotation: 0,
    };
    setClipArtElements((prev) => [...prev, newClipArt]);
    setSelectedClipArtId(newClipArt.id);
  };

  const updateClipArtPosition = (
    id: string,
    position: { x: number; y: number }
  ) => {
    setClipArtElements((prev) =>
      prev.map((el) => (el.id === id ? { ...el, position } : el))
    );
  };

  const updateClipArtTransform = (
    id: string,
    scale: number,
    rotation: number
  ) => {
    setClipArtElements((prev) =>
      prev.map((el) => (el.id === id ? { ...el, scale, rotation } : el))
    );
  };

  const removeClipArt = (id: string) => {
    setClipArtElements((prev) => prev.filter((el) => el.id !== id));
    if (selectedClipArtId === id) {
      setSelectedClipArtId(null);
    }
  };

  const selectClipArt = (id: string | null) => {
    setSelectedClipArtId(id);
    if (id) setSelectedTextId(null);
  };

  // Load system fonts when the provider mounts
  useEffect(() => {
    loadSystemFonts();
  }, []);

  return (
    <EditorContext.Provider
      value={{
        originalImage,
        croppedImage,
        isResizeMode,
        imagePosition,
        scale,
        rotation,
        flipHorizontal,
        flipVertical,
        textElements,
        clipArtElements,
        selectedTextId,
        selectedClipArtId,
        containerRef,
        imageEffects,
        backgroundColor,
        frameColor,
        cameraColor,
        googleFonts,
        systemFonts,
        isRemoteImage,
        downloadWithImage,
        phoneBrand,
        phoneModel,
        setImagePosition,
        setOriginalImage,
        setCroppedImage,
        setIsResizeMode,
        setScale,
        setRotation,
        setFlipHorizontal,
        setFlipVertical,
        resetImageTransforms,
        resetImageEffects,
        resetAll,
        addText,
        updateTextPosition,
        updateTextContent,
        updateTextFont,
        updateTextColor,
        updateTextStyle,
        removeText,
        selectText,
        updateImageEffects,
        downloadDesign,
        startResizeMode,
        keepChanges,
        setBackgroundColor,
        setFrameColor,
        setCameraColor,
        addGoogleFont,
        loadSystemFonts,
        setIsRemoteImage,
        setDownloadWithImage,
        setPhoneBrand,
        setPhoneModel,
        addClipArt,
        updateClipArtPosition,
        updateClipArtTransform,
        removeClipArt,
        selectClipArt,
      }}
    >
      {children}
    </EditorContext.Provider>
  );
}

export function useEditor() {
  const context = useContext(EditorContext);
  if (!context) {
    throw new Error('useEditor must be used within an EditorProvider');
  }
  return context;
}
