import css from './ImageGalleryItem.module.css';
export const ImageGalleryItem = ({ image, onClick }) => {
  return (
    <li className={css.galleryItem}>
      <img
        className={css.galleryItem_image}
        src={image.webformatURL}
        alt={image.tags}
        onClick={() => onClick(image.largeImageURL, image.tags)}
      />
    </li>
  );
};
