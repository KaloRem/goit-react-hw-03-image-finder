import React from 'react';

const ImageGalleryItem = ({ elements, handleUrlOnClick, toggleModal }) => {
  const handleUrlOnClickComponent = bigPhoto => {
    toggleModal();
    handleUrlOnClick(bigPhoto);
  };

  return elements.map(element => (
    <li
      key={element.id}
      onClick={() => handleUrlOnClickComponent(element.largeImageURL)}
    >
      <img
        src={element.webformatURL}
        alt={element.tags}
      />
    </li>
  ));
};
export default ImageGalleryItem;