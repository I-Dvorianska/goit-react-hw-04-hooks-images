import { useEffect, useState } from "react";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
import Searchbar from "./Searchbar/Searchbar";
import "./App.css";
import ImageGallery from "./ImageGallery/ImageGallery";
import Button from "./Button/Button";
import Modal from "./Modal/Modal";
import toast, { Toaster } from "react-hot-toast";
import fetchImages from "utils/fetchApi";

function App() {
  const [searchText, setSearchText] = useState("");
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [showBtn, setShowBtn] = useState(false);

  useEffect(() => {
    setLoading(true);

    if (!searchText) return;

    fetchImages(searchText, page).then((res) => {
      const imagesData = res.hits;
      if (imagesData.length === 0) {
        return notify();
      }

      if (imagesData.length === 12) {
        setImages((prevState) => [...prevState, ...imagesData]);
        setLoading(false);
        setShowBtn(true);
        if (imagesData.length < 12) {
          setShowBtn(false);
        }
      }

      if (page > 1) {
        scrollToBottom();
      }
    });
  }, [page, searchText]);

  const getSearchFieldText = (text) => {
    setImages([]);
    setPage(1);
    setSearchText(text);
  };

  const changePageNumber = (page) => {
    setPage(page);
  };

  const selectImage = (image) => {
    setSelectedImage(image);
  };

  const closeModal = (e) => {
    setSelectedImage(null);
  };

  const scrollToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  };

  const notify = () => toast("Here is no images to show");

  const showLoadMoreBtn = images.length > 0 && !loading && showBtn;

  return (
    <>
      <Searchbar onSubmit={getSearchFieldText} />
      <Toaster
        containerStyle={{
          top: 300,
          left: 0,
        }}
        toastOptions={{
          duration: 2000,
          style: {
            border: "2px solid #e60000",
            padding: "8px",
            color: "#e60000",
          },
        }}
      />
      {images.length > 0 && (
        <ImageGallery images={images} selected={selectImage} />
      )}
      {loading && (
        <div className="LoaderDiv">
          <Loader
            type="Circles"
            color="#46c5f0"
            height={40}
            width={60}
            style={{
              marginLeft: "610px",
              marginTop: "20px",
              marginBottom: "20px",
            }}
            timeout={1000}
          />
        </div>
      )}
      {selectedImage !== null && (
        <Modal onCloseModal={closeModal}>
          <img src={selectedImage} alt="" />
        </Modal>
      )}
      {showLoadMoreBtn && <Button page={page} onLoad={changePageNumber} />}
    </>
  );
}

export default App;
