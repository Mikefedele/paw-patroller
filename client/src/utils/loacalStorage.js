export const getSavedBizIds = () => {
  const savedBizIds = localStorage.getItem('saved_businesses')
    ? JSON.parse(localStorage.getItem('saved_businesses'))
    : [];

  return savedBizIds;
};

export const saveBizIds = (bizIdArray) => {
  if (bizIdArray.length) {
    localStorage.setItem('saved_businesses', JSON.stringify(bizIdArray));
  } else {
    localStorage.removeItem('saved_businesses');
  }
};

export const removeBookId = (bookId) => {
  const savedBookIds = localStorage.getItem('saved_books')
    ? JSON.parse(localStorage.getItem('saved_books'))
    : null;

  if (!savedBookIds) {
    return false;
  }  
  const updatedSavedBookIds = savedBookIds?.filter((savedBookId) => savedBookId !== bookId);
  localStorage.setItem('saved_books', JSON.stringify(updatedSavedBookIds));

  return true;
};