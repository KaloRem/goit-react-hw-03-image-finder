import React from 'react';
import axios from 'axios';
import ImageGallery from './ImageGallery/ImageGallery';
import ImageGalleryItem from './ImageGalleryItem/ImageGalleryItem';
import Loader from './Loader/Loader';
import SearchBar from './SearchBar/SearchBar';
import Button from './Button/Button';
import Modal from './Modal/Modal';

export class App extends React.Component {
  state = {
    element: null,
    loader: false,
    inputValue: '',
    totalHits: null,
    per_page: 4,
    page: 1,
    howPage: null,
    bigPhoto: null,
    showModal: false,
  };

  fetchPhoto = async query => {
    try {
      this.setState({
        loader: true,
      });
      if (!query) {
        const { data } = await axios.get(
          `https://pixabay.com/api/?q=&page=1&key=39498019-0e2531e9378e4701f97ebc4d8&image_type=photo&orientation=horizontal&per_page=${this.state.per_page}&page=${this.state.page}`
        );
        this.setState({
          element: data.hits,
          totalHits: data.totalHits,
        });
        return;
      }
      const { data } = await axios.get(
        `https://pixabay.com/api/?q=${query}&page=1&key=39498019-0e2531e9378e4701f97ebc4d8&image_type=photo&orientation=horizontal&per_page=${this.state.per_page}&page=${this.state.page}`
      );
      this.setState({
        element: data.hits,
        totalHits: data.totalHits,
      });
    } catch (error) {
      console.error('Error:', error);
    } finally {
      this.setState({
        loader: false,
      });
    }
  };

  componentDidMount() {
    this.fetchPhoto();
  }

  onSubmit = data => {
    this.setState(
      {
        inputValue: data,
      },
      () => {
        this.fetchPhoto(data);
      }
    );
  };

  handleOnClick = pageNumber => {
    const fetchPhotoNewPage = async () => {
      try {
        this.setState({
          loader: true,
        });
        const { data } = await axios.get(
          `https://pixabay.com/api/?q=${this.state.inputValue}&page=1&key=39498019-0e2531e9378e4701f97ebc4d8&image_type=photo&orientation=horizontal&per_page=${this.state.per_page}&page=${pageNumber}`
        );
        this.setState(prevState => ({
          element: [...prevState.element, ...data.hits],
        }));
      } catch (error) {
        console.error('Error:', error);
      } finally {
        this.setState({
          loader: false,
        });
      }
      };
      
    fetchPhotoNewPage();
    this.setState({
      page: pageNumber,
    });
  };

  handleUrlOnClick = bigPhoto => {
    this.setState({
      bigPhoto: bigPhoto,
    });
  };

  toggleModal = () => {
    if (this.state.showModal === false) {
      this.setState({
        showModal: true,
      });
      return;
    }
    this.setState({
      showModal: false,
    });
  };

  toggleModalEsc = () => {
    this.setState({
      showModal: false,
    });
  };

  render() {
    return (
      <div>
        {this.state.loader && <Loader />}
        <SearchBar onSubmit={this.onSubmit} />
        {this.state.element !== null && (
          <ImageGallery>
            <ImageGalleryItem
              elements={this.state.element}
              toggleModal={this.toggleModal}
              handleUrlOnClick={this.handleUrlOnClick}
            />
          </ImageGallery>
        )}
        {this.state.element !== null &&
          this.state.totalHits > this.state.per_page &&
          Math.ceil(this.state.totalHits / this.state.per_page) !==
            this.state.page &&
          this.state.element.length !== 0 && (
            <Button
              page={this.state.page}
              per_page={this.state.per_page}
              totalHits={this.state.totalHits}
              handleOnClick={this.handleOnClick}
            />
          )}
        {this.state.showModal && (
          <Modal
            photo={this.state.bigPhoto}
            toggleModal={this.toggleModal}
            toggleModalEsc={this.toggleModalEsc}
          />
        )}
      </div>
    );
  }
}
