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
  const finished = pageCount === readPage;

  const newBook = {
    id, name, year, author, summary, publisher, pageCount, readPage, finished, reading, createdAt, updatedAt,
  };

  books.push(newBook);

  const success = books.filter((book) => book.id === id).length > 0;

  if (!name) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. Mohon isi nama buku',
    });
    response.code(400);
    return response;
  }

  if (readPage > pageCount) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
    });
    response.code(400);
    return response;
  }

  
};

module.exports = {
  getAllBooks,
  addBook,
};
