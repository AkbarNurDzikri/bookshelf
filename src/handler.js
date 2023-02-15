const {nanoid} = require('nanoid');
const books = require('./books');

const addBook = (request, h) => {
  try {
    const {
      name, year, author, summary, publisher, pageCount, readPage, reading,
    } = request.payload;

    const id = nanoid(16);
    const insertedAt = new Date().toISOString();
    const updatedAt = insertedAt;
    const finished = pageCount === readPage;

    const newBook = {
      id, name, year, author, summary, publisher, pageCount,
      readPage, finished, reading, insertedAt, updatedAt,
    };

    if (!name) {
      return h.response({
        status: 'fail',
        message: 'Gagal menambahkan buku. Mohon isi nama buku',
      }).code(400);
    }

    if (readPage > pageCount) {
      return h.response({
        status: 'fail',
        message: 'Gagal menambahkan buku. ' +
        'readPage tidak boleh lebih besar dari pageCount',
      }).code(400);
    }

    books.push(newBook);
    const success = books.filter((book) => book.id === id).length > 0;
    if (success) {
      return h.response({
        status: 'success',
        message: 'Buku berhasil ditambahkan',
        data: {
          bookId: id,
        },
      }).code(201);
    }
  } catch (e) {
    return h.response({
      status: 'error',
      message: 'Buku gagal ditambahkan',
    }).code(500);
  }
};

const getAllBooks = (request, h) => {
  const {reading, finished, name} = request.query;

  if (reading === '0') {
    const unReadingBooks = books.filter((book) => book.reading === false);
    const results = unReadingBooks.map((book) => ({
      id: book.id,
      name: book.name,
      publisher: book.publisher,
    }));

    return h.response({
      status: 'success',
      data: {
        books: results,
      },
    }).code(200);
  }

  if (reading === '1') {
    const readingBooks = books.filter((book) => book.reading === true);
    const results = readingBooks.map((book) => ({
      id: book.id,
      name: book.name,
      publisher: book.publisher,
    }));

    return h.response({
      status: 'success',
      data: {
        books: results,
      },
    }).code(200);
  }

  if (finished === '0') {
    const unfinishedBooks = books.filter((book) => book.finished === false);
    const results = unfinishedBooks.map((book) => ({
      id: book.id,
      name: book.name,
      publisher: book.publisher,
    }));

    return h.response({
      status: 'success',
      data: {
        books: results,
      },
    }).code(200);
  }

  if (finished === '1') {
    const unfinishedBooks = books.filter((book) => book.finished === true);
    const results = unfinishedBooks.map((book) => ({
      id: book.id,
      name: book.name,
      publisher: book.publisher,
    }));

    return h.response({
      status: 'success',
      data: {
        books: results,
      },
    }).code(200);
  }

  if (name !== undefined) {
    const filteredBooks = books.filter((book) =>
      book.name.toLowerCase().includes(name.toLowerCase()));
    const results = filteredBooks.map((book) => ({
      id: book.id,
      name: book.name,
      publisher: book.publisher,
    }));

    return h.response({
      status: 'success',
      data: {
        books: results,
      },
    }).code(200);
  }

  const allBooks = books.map((book) => ({
    id: book.id,
    name: book.name,
    publisher: book.publisher,
  }));

  const results = books === [] ? books : allBooks;
  return h.response({
    status: 'success',
    data: {
      books: results,
    },
  }).code(200);
};

const getDetailBook = (request, h) => {
  const {bookId} = request.params;
  const book = books.filter((book) => book.id === bookId);

  if (book == '') {
    return h.response({
      status: 'fail',
      message: 'Buku tidak ditemukan',
    }).code(404);
  }

  return h.response({
    status: 'success',
    data: {
      book: book[0],
    },
  }).code(200);
};

const updateBook = (request, h) => {
  const {bookId} = request.params;
  const {
    name, year, author, summary, publisher, pageCount, readPage, reading,
  } = request.payload;

  if (!name) {
    return h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. Mohon isi nama buku',
    }).code(400);
  }

  if (readPage > pageCount) {
    return h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. ' +
      'readPage tidak boleh lebih besar dari pageCount',
    }).code(400);
  }

  const index = books.findIndex((book) => book.id === bookId);
  if (index === -1) {
    return h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. Id tidak ditemukan',
    }).code(404);
  }

  books[index] = {
    ...books[index],
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  };

  return h.response({
    status: 'success',
    message: 'Buku berhasil diperbarui',
  }).code(200);
};

const deleteBook = (request, h) => {
  const {bookId} = request.params;
  const index = books.findIndex((book) => book.id === bookId);

  if (index === -1) {
    return h.response({
      status: 'fail',
      message: 'Buku gagal dihapus. Id tidak ditemukan',
    }).code(404);
  }

  books.splice(index, 1);
  return h.response({
    status: 'success',
    message: 'Buku berhasil dihapus',
  }).code(200);
};

module.exports = {
  addBook,
  getAllBooks,
  getDetailBook,
  updateBook,
  deleteBook,
};
