import axios from 'axios';
export class ImagesPixabayApi {
  static API_KEY = '40453479-a11ad8876b027e59d8fa15ee5';
  static PAGE_LIMIT = 12;
  static BASE_URL = 'https://pixabay.com/api/?';

  constructor() {
    this.q = '';
    this.page = 1;
    this.totalPage = 1;
  }

  async getImages() {
    const PARAMS = new URLSearchParams({
      q: this.q,
      page: this.page,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      per_page: ImagesPixabayApi.PAGE_LIMIT,
      key: ImagesPixabayApi.API_KEY,
    });

    const url = ImagesPixabayApi.BASE_URL + PARAMS;

    try {
      const response = await axios.get(url);
      const images = response.data;
      return images;
    } catch (error) {
      console.error('Error fetching images:', error);
      throw error;
    }
  }
}
