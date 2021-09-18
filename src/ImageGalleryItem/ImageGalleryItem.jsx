import './ImageGalleryItem.css';
import PropTypes from 'prop-types';

const ImageGalleryItem = ({ id, webformatURL,selectImage, largeImageURL}) => {
  
  return <li key={id} className="ImageGalleryItem" onClick={() => selectImage(largeImageURL)}>
  <img src={webformatURL} alt="" className="ImageGalleryItem-image" />
</li>
}

ImageGalleryItem.propTypes = {
  id: PropTypes.number,
  webformatURL: PropTypes.string,
  selectImage: PropTypes.func,
  largeImageURL: PropTypes.string
}


export default ImageGalleryItem;