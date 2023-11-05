import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Modal from '../Modal/Modal';
import styles from './ImageGalleryItem.module.css'

class ImageItem extends Component {
  state = {
    showModal: false,
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  render() {
    const { showModal } = this.state;
    const { image } = this.props;
    return (
      <>
        <div className={ styles.item }>
          <img className={ styles.img }
            src={image.webformatURL}
            alt={image.tags}
            onClick={this.toggleModal}
          />
          {showModal && (
            <Modal
              largeImageURL={image.largeImageURL}
              tags={image.tags}
              onClose={this.toggleModal}
            />
          )}
        </div>
      </>
    );
  }
}

ImageItem.propTypes = {
  image: PropTypes.shape({
    webformatURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
  }).isRequired,
};

export default ImageItem;