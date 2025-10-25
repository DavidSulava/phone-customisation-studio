const PIXABAY_API_KEY = process.env.NEXT_PUBLIC_PIXABAY_API_KEY;
const PIXABAY_API_URL = 'https://pixabay.com/api/';

export type PixabayImageType = 'photo' | 'vector' | 'illustration';

export interface PixabayImage {
  id: number;
  pageURL: string;
  type: string;
  tags: string;
  previewURL: string;
  previewWidth: number;
  previewHeight: number;
  webformatURL: string;
  webformatWidth: number;
  webformatHeight: number;
  largeImageURL: string;
  fullHDURL: string;
  imageURL: string;
  imageWidth: number;
  imageHeight: number;
  imageSize: number;
  views: number;
  downloads: number;
  likes: number;
  comments: number;
  user_id: number;
  user: string;
  userImageURL: string;
}

interface PixabayResponse {
  total: number;
  totalHits: number;
  hits: PixabayImage[];
}

export async function searchPixabayImages(
  query: string = '',
  type: PixabayImageType = 'photo',
  page: number = 1,
  perPage: number = 20
): Promise<PixabayResponse> {
  if (!PIXABAY_API_KEY) {
    throw new Error('Pixabay API key is not configured');
  }

  const params = new URLSearchParams({
    key: PIXABAY_API_KEY,
    q: query,
    image_type: type,
    page: page.toString(),
    per_page: perPage.toString(),
    safesearch: 'true',
  });

  const response = await fetch(`${PIXABAY_API_URL}?${params}`);

  if (!response.ok) {
    throw new Error('Failed to fetch images from Pixabay');
  }

  return response.json();
}
