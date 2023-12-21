import axios from 'axios';

const KEY = '40453479-a11ad8876b027e59d8fa15ee5';
const pageLimit = 12;
axios.defaults.baseURL = 'https://pixabay.com/api/';

export const fetchImages = async (searchQuery, page) => {
  const { data } = await axios({
    params: {
      key: KEY,
      q: searchQuery,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      per_page: pageLimit,
      page: page,
    },
  });
  return data;
};
// fetchImages();

// export class ImagesPixabayApi {
//   static API_KEY = '40453479-a11ad8876b027e59d8fa15ee5';
//   static PAGE_LIMIT = 12;
//   static BASE_URL = 'https://pixabay.com/api/?';

//   constructor() {
//     this.q = '';
//     this.page = 1;
//     this.totalPage = 1;
//   }

//   async getImages() {
//     const PARAMS = new URLSearchParams({
//       key: ImagesPixabayApi.API_KEY,
//       q: this.q,
//       page: this.page,
//       image_type: 'photo',
//       orientation: 'horizontal',
//       safesearch: true,
//       per_page: ImagesPixabayApi.PAGE_LIMIT,
//     });

//     const url = ImagesPixabayApi.BASE_URL + PARAMS;
//     console.log(url);

//     try {
//       const response = await axios.get(url);
//       const images = response.data;
//       console.log(images);
//       return images;
//     } catch (error) {
//       console.error('Error fetching images:', error);
//       throw error;
//     }
//   }
// }
