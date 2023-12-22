import { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { fetchImages } from '../Api/apiService';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Modal } from './Modal/Modal';
import css from './App.module.css';
import { Button } from './Button/Button';

export class App extends Component {
  state = {
    searchQuery: '',
    page: 1,
    images: [],
    loading: false,
    showModal: false,
    showLoader: false,
    largeImageURL: null,
    tags: '',
    error: null,
  };

  async componentDidUpdate(prevProps, prevState) {
    const { searchQuery, page } = this.state;
    if (prevState.searchQuery !== searchQuery || prevState.page !== page) {
      try {
        const allImages = await fetchImages(searchQuery, page);
        if (allImages.length === 0) {
          toast.success(
            'Sorry, there are no more images matching your search query.'
          );
          return;
        }
        this.setState(prevState => ({
          images: [...prevState.images, ...allImages.hits],
        }));
      } catch (error) {
        this.setState({ error: error.message });
      } finally {
      }
    }
  }

  closeModal = () => {
    this.setState({ showModal: false });
  };

  openModal = (largeImageURL, tags) => {
    this.setState({ showModal: true, largeImageURL, tags });
  };

  hadleSearchFormSubmit = searchQuery => {
    this.setState({ searchQuery, page: 1, images: [] });
  };
  loadMoreClick = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  render() {
    const { images, largeImageURL, showModal } = this.state;
    return (
      <div className={css.app}>
        <Searchbar onSubmitForm={this.hadleSearchFormSubmit} />
        <ImageGallery images={images} onModalClick={this.openModal} />
        {showModal && (
          <Modal largeImageURL={largeImageURL} onCloseModal={this.closeModal} />
        )}
        {images.length > 0 && <Button onLoadMoreClick={this.loadMoreClick} />}
        <ToastContainer autoClose={3000} />
      </div>
    );
  }
}
