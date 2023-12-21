import css from './Button.module.css';
export const Button = ({ onClick }) => {
  return (
    <button className={css.loadMore_button} type="button" onClick={onClick}>
      Load more
    </button>
  );
};
