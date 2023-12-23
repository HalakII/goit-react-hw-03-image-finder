import { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { fetchImages } from '../Api/apiService';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Modal } from './Modal/Modal';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import css from './App.module.css';

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
    isEmpty: false,
    
  };

  async componentDidUpdate(_, prevState) {
    const { searchQuery, page, randomId } = this.state;
    if (prevState.searchQuery !== searchQuery || prevState.page !== page || prevState.randomId !== randomId) {
      try {
        this.setState({ showLoader: true });

        const {hits, totalHits} = await fetchImages(searchQuery, page);
        if (hits.length === 0) {
          toast.error(
            'Sorry, there are no images matching your search query.'
          );
          return;
        }
        this.setState(prevState => ({
          images: [...prevState.images, ...hits],
        }));
        const totalPages = Math.ceil(totalHits / 12);
        console.log(totalPages);
        if (page === totalPages) {
          this.setState({ isEmpty: true });
          toast.success(
            'Sorry, there are no more images matching your search query.'
          );
        }
      } catch (error) {
        this.setState({ error: error.message });
        toast.error(
          `Sorry, ${error.message} 😭.`
        );
        return;
      } finally {
        this.setState({ showLoader: false });
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
    this.setState({ searchQuery, page: 1, images: [], randomId: Math.random(), showModal: false, });
  };
  loadMoreClick = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  render() {
    const { images, largeImageURL, showModal,  isEmpty, showLoader } =
      this.state;
    return (
      <div className={css.app}>
        <Searchbar onSubmitForm={this.hadleSearchFormSubmit} />
        <ImageGallery images={images} onModalClick={this.openModal} />
        {showModal && (
          <Modal largeImageURL={largeImageURL} onCloseModal={this.closeModal} />
        )}
        {images.length > 0 && !isEmpty && <Button onLoadMoreClick={this.loadMoreClick} />}
        {showLoader && <Loader />}
        <ToastContainer autoClose={3000} />
      </div>
    );
  }
}
