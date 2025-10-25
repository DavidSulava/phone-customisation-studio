export type IPhoneModel =
  | '13'
  | '13mini'
  | '13pro'
  | '13promax'
  | '14'
  | '14plus'
  | '14pro'
  | '14promax'
  | '15'
  | '15plus'
  | '15pro'
  | '15promax'
  | '16'
  | '16plus'
  | '16pro'
  | '16promax';

export type SamsungModel = 's23' | 's23plus' | 's23ultra';
export type PhoneBrand = 'iphone' | 'samsung';
export type PhoneModel = IPhoneModel | SamsungModel;

export interface ImageEffects {
  opacity: number;
  brightness: number;
  contrast: number;
  saturation: number;
  blur: number;
  hue: number;
}

export interface TextElement {
  id: string;
  text: string;
  font: string;
  position: { x: number; y: number };
}

export interface IProduct {
  name: string;
  model: PhoneModel;
  defaultColors?: string[];
}
