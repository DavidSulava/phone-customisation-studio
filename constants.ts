import { IProduct, PhoneBrand, PhoneModel } from '@/types';

export const defaultColors = [
  '#f44336',
  '#e91e63',
  '#9c27b0',
  '#673ab7',
  '#3f51b5',
  '#2196f3',
  '#03a9f4',
  '#00bcd4',
  '#009688',
  '#4caf50',
  '#8bc34a',
  '#cddc39',
  '#ffeb3b',
  '#ffc107',
  '#ff9800',
  '#ff5722',
];

export const fonts = [
  'Arial',
  'Times New Roman',
  'Courier New',
  'Georgia',
  'Verdana',
  'Helvetica',
  'Tahoma',
  'Trebuchet MS',
  'Impact',
];

export const fontSizes = Array.from({ length: 20 }, (_, i) => (i + 1) * 4);

export const iphoneProducts: IProduct[] = [
  // _______16______________
  {
    name: 'IPhone 16 Pro Max',
    model: '16promax',
    defaultColors: ['#bfa48f', '#c2bcb2', '#f2f1ed', '#3c3c3d'],
  },
  {
    name: 'IPhone 16 Pro',
    model: '16pro',
    defaultColors: ['#bfa48f', '#c2bcb2', '#f2f1ed', '#3c3c3d'],
  },
  {
    name: 'IPhone 16 Plus',
    model: '16plus',
    defaultColors: ['#9aadf6', '#b0d4d2', '#f2adda', '#fafafa', '#3c4042'],
  },
  {
    name: 'IPhone 16',
    model: '16',
    defaultColors: ['#9aadf6', '#b0d4d2', '#f2adda', '#fafafa', '#3c4042'],
  },
  // --------15------------
  {
    name: 'IPhone 15 Pro Max',
    model: '15promax',
    defaultColors: ['#837f7d', '#2f4452', '#dddddd', '#1b1b1b'],
  },
  {
    name: 'IPhone 15 Pro',
    model: '15pro',
    defaultColors: ['#837f7d', '#2f4452', '#dddddd', '#1b1b1b'],
  },
  {
    name: 'IPhone 15 Plus',
    model: '15plus',
    defaultColors: ['#E3C8CA', '#E6E0C1', '#CAD4C5', '#CED5D9', '#35393B'],
  },
  {
    name: 'IPhone 15',
    model: '15',
    defaultColors: ['#E3C8CA', '#E6E0C1', '#CAD4C5', '#CED5D9', '#35393B'],
  },

  // ---------14-------------
  {
    name: 'IPhone 14 Pro Max',
    model: '14promax',
    defaultColors: ['#594f63', '#f4e8ce', '#f0f2f2', '#403e3d'],
  },
  {
    name: 'IPhone 14 Pro',
    model: '14pro',
    defaultColors: ['#594f63', '#f4e8ce', '#f0f2f2', '#403e3d'],
  },
  {
    name: 'IPhone 14 Plus',
    model: '14plus',
    defaultColors: [
      '#a0b4c7',
      '#e6ddeb',
      '#f9e479',
      '#222930',
      '#faf6f2',
      '#fc0324',
    ],
  },
  {
    name: 'IPhone 14',
    model: '14',
    defaultColors: [
      '#a0b4c7',
      '#e6ddeb',
      '#f9e479',
      '#222930',
      '#faf6f2',
      '#fc0324',
    ],
  },
  // ---------13-------------
  {
    name: 'IPhone 13 Pro Max',
    model: '13promax',
    defaultColors: ['#394c38', '#faf6f2', '#fae7cf', '#54524f', '#a7c1d9'],
  },
  {
    name: 'IPhone 13 Pro',
    model: '13pro',
    defaultColors: ['#394c38', '#faf6f2', '#fae7cf', '#54524f', '#a7c1d9'],
  },
  {
    name: 'Iphone 13 mini',
    model: '13mini',
    defaultColors: [
      '#394c38',
      '#faddd7',
      '#276787',
      '#232a31',
      '#faf6f2',
      '#bf0013',
    ],
  },
  {
    name: 'Iphone 13',
    model: '13',
    defaultColors: [
      '#394c38',
      '#faddd7',
      '#276787',
      '#232a31',
      '#faf6f2',
      '#bf0013',
    ],
  },
];

export const samsungProducts: IProduct[] = [
  {
    name: 'Samsung S23',
    model: 's23',
    defaultColors: ['#ede1eb', '#f8f1e7', '#8e8e8e', '#d6e6dc', '#665776'],
  },
];

export const allProducts: { [key in PhoneBrand]: IProduct[] } = {
  iphone: iphoneProducts,
  samsung: samsungProducts,
};

export const smallerSizeModels: PhoneModel[] = [
  '16',
  '16pro',
  '15',
  '15pro',
  '14',
  '14pro',
  '13',
  '13pro',
  '13mini',
];
