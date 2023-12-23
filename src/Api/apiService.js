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
