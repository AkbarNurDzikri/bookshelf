const {nanoid} = require('nanoid');
const books = require('./books');

const getAllBooks = () => ({
  status: 'success',
  data: {
    books,
  },
});

const addBook = (request, h) => {
  const {name, year, author, summary, publisher, pageCount, readPage, reading} = request.payload;
  const id = nanoid(16);
  const createdAt = new Date().toISOString();
  const updatedAt = createdAt;

  const newBook = {
    name, year, author, summmary, publisher, pageCount, readPage, reading, id, createdAt, updatedAt
  };

  books.push(newBook);
  console.log(books);
};

module.exports = {
  getAllBooks,
  addBook
};
