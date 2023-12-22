import css from './ImageGalleryItem.module.css';
export const ImageGalleryItem = ({
  id,
  tags,
  webformatURL,
  largeImageURL,
  onModalClick,
}) => {
  return (
    <li key={id} className={css.galleryItem}>
      <img
        className={css.galleryItem_image}
        src={webformatURL}
        alt={tags}
        onClick={() => onModalClick(largeImageURL, tags)}
      />
    </li>
  );
};
