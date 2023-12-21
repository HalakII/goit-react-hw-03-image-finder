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
    images: null,
    loading: false,
    showModal: false,
    showLoadMoreBtn: false,
    showLoader: false,
    largeImageURL: '',
    tags: '',
    endCollection: false,
  };

  componentDidUpdate(prevProps, prevState) {
    const { searchQuery, page, largeImageURL, images } = this.state;
    if (prevState.searchQuery !== searchQuery || prevState.page !== page) {
      fetchImages(searchQuery).then(({ hits }) => {
        this.setState({ images: hits });
      });
    }
    if (prevState.largeImageURL !== largeImageURL) {
      this.setState({ showModal: true });
    }

    // if (images.length === 0) {
    //   toast.error('Images not found');
    //   return;
    // }
    // this.setState({ showLoadMoreBtn: true });
  }

  closeModal = () => {
    this.setState({ showModal: false });
  };

  showModal = (largeImageURL, tags) => {
    this.setState({ largeImageURL, tags });
  };

  hadleSearchFormSubmit = searchQuery => {
    this.setState({ searchQuery, page: 1, images: [] });
  };
  loadMoreClick = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  render() {
    const { images, largeImageURL, showLoadMoreBtn, showModal } = this.state;
    return (
      <div className={css.app}>
        <Searchbar onSubmitForm={this.hadleSearchFormSubmit} />
        <ImageGallery images={images} onClick={showModal} />
        {showModal && (
          <Modal
            largeImageURL={largeImageURL}
            tags={this.state.tags}
            onCloseModal={this.closeModal}
          />
        )}
        {showLoadMoreBtn && <Button onClick={this.loadMoreClick} />}
        <ToastContainer autoClose={3000} />
      </div>
    );
  }
}
