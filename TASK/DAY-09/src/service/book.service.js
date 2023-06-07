import request from "./request";

const ENDPOINT = "api/book";

const searchBook = async (searchText) => {
  const url = `${ENDPOINT}/search?keyword=${searchText}`;
  return request
    .get(url)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.log(err);
    });
};

const bookService = {
  searchBook,
};
export default bookService;
