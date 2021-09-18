function fetchImages(nameImg, pageNumber) {
  const URL = 'https://pixabay.com/api';
  const KEY = '22634549-5cdc48e9fdfcb009c2ce01724';

  return fetch(
    `${URL}/?q=${nameImg}&page=${pageNumber}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`,
  ).then(response => {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(new Error(`Мы не нашли такой картинки по запросу ${nameImg}`));
  });
}



export default fetchImages;