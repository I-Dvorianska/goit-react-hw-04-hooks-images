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
  const [selectedImage, setSelectedImage] = useState("null");
  const [showBtn, setShowBtn] = useState(false);

  useEffect(() => {
    setLoading(true);

    if (!searchText) return;
    if (page === 1) {
      fetchImages(searchText, 1).then((res) => {
        const imagesData = res.hits;
        console.log(imagesData.length);

        if (imagesData.length === 0) {
          return notify();
        }

        if (imagesData.length === 12) {
          setImages(imagesData);
          setLoading(false);
          setShowBtn(true);
          if (imagesData.length < 12) {
            setShowBtn(false);
          }
        }
      });
    }

    if (page !== 1) {
      setLoading(true);

      fetchImages(searchText, page)
        .then((res) => {
          const imagesData = res.hits;

          if (imagesData.length < 12) {
            setShowBtn(false);
          }
          setImages((prevState) => [...prevState, ...imagesData]);
          setLoading(false);
        })
        .finally(scrollToBottom);
    }
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

  const onClose = () => {
    setSelectedImage("");
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
      {selectedImage !== "null" && (
        <Modal image={selectedImage} onClick={onClose} />
      )}
      {showLoadMoreBtn && <Button page={page} onLoad={changePageNumber} />}
    </>
  );
}

// class App extends Component {
//   state = {
//     searchText: "",
//     images: [],
//     page: 1,
//     loading: false,
//     selectedImage: "null",
//     showBtn: false,
//   };

//   componentDidUpdate(prevProps, prevState) {
//     const { page, searchText } = this.state;

//     if (prevState.searchText !== searchText) {
//       this.setState({ images: [], loading: true });

//       fetchImages(searchText, 1).then((res) => {
//         const imagesData = res.hits;

//         if (imagesData.length === 0) {
//           return this.notify();
//         }
//         if (imagesData.length === 12) {
//           return this.setState({
//             images: imagesData,
//             loading: false,
//             showBtn: true,
//           });
//         }
//         if (imagesData.length < 12) {
//           return this.setState({
//             images: imagesData,
//             loading: false,
//             showBtn: false,
//           });
//         }
//       });
//     }

//     if (prevState.page !== page) {
//       if (page !== 1) {
//         this.setState({ loading: true });
//         fetchImages(searchText, page)
//           .then((res) => {
//             const imagesData = res.hits;
//             if (imagesData.length < 12) {
//               this.setState({ showBtn: false });
//             }
//             this.setState({
//               images: [...this.state.images, ...imagesData],
//               loading: false,
//             });
//           })
//           .finally(this.scrollToBottom);
//       }
//     }
//   }

//   notify = () => toast("Here is no images to show");

//   scrollToBottom = () => {
//     window.scrollTo({
//       top: document.documentElement.scrollHeight,
//       behavior: "smooth",
//     });
//   };

//   getSearchFieldText = (text) => {
//     this.setState({
//       searchText: text,
//     });
//   };

//   changePageNumber = (page) => {
//     this.setState({ page });
//   };

//   selectImage = (image) => {
//     this.setState({ selectedImage: image });
//   };

//   onClose = () => {
//     this.setState({ selectedImage: "null" });
//   };

//   render() {
//     const { getSearchFieldText, changePageNumber, selectImage, onClose } = this;
//     const { images, page, loading, selectedImage, showBtn } = this.state;
//     const showLoadMoreBtn = images.length > 0 && !loading && showBtn;

//     return (
//       <>
//         <Searchbar onSubmit={getSearchFieldText} />
//         <Toaster
//           containerStyle={{
//             top: 300,
//             left: 0,
//           }}
//           toastOptions={{
//             duration: 2000,
//             style: {
//               border: "2px solid #e60000",
//               padding: "8px",
//               color: "#e60000",
//             },
//           }}
//         />
//         {images.length > 0 && (
//           <ImageGallery images={images} selected={selectImage} />
//         )}
//         {loading && (
//           <div className="LoaderDiv">
//             <Loader
//               type="Circles"
//               color="#46c5f0"
//               height={40}
//               width={60}
//               style={{
//                 marginLeft: "610px",
//                 marginTop: "20px",
//                 marginBottom: "20px",
//               }}
//               timeout={1000}
//             />
//           </div>
//         )}
//         {selectedImage !== "null" && (
//           <Modal image={selectedImage} onClick={onClose} />
//         )}
//         {showLoadMoreBtn && <Button page={page} onLoad={changePageNumber} />}
//       </>
//     );
//   }
// }

export default App;
