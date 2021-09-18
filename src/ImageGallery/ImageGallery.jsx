import './ImageGallery.css';
import ImageGalleryItem from 'ImageGalleryItem/ImageGalleryItem';
import PropTypes from 'prop-types';

const ImageGallery = ({ images, selected }) => {
   
    return <ul className="ImageGallery">
        {images.map(image =>
            <ImageGalleryItem
                id={image.id}
                key={image.id}
                webformatURL={image.webformatURL}
                largeImageURL={image.largeImageURL}
                selectImage={selected}
             />
             )}
            </ul>
}

ImageGallery.propTypes = {
    images: PropTypes.arrayOf(PropTypes.object),
    selected: PropTypes.func
}

export default ImageGallery;