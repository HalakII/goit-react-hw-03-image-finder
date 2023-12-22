import css from './Button.module.css';
export const Button = ({ onLoadMoreClick }) => {
  return (
    <button
      className={css.loadMore_button}
      type="button"
      onClick={onLoadMoreClick}
    >
      Load more
    </button>
  );
};
