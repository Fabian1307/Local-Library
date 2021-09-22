function getTotalBooksCount(books) {
  return books.length;
}

function getTotalAccountsCount(accounts) {
  return accounts.length;
}

function getBooksBorrowedCount(books) {
  let total = 0;
  books.forEach((book) => {
    if (!book.borrows[0].returned) {
      total++;
    }
  });

  return total;
}

function getMostCommonGenres(books) {
  const result = books.reduce((accum, book) => {
    const genre = book.genre;
    const genreInfo = accum.find((element) => element.name === genre);
    if (!genreInfo) {
      const newGenreInfo = {
        name: genre,
        count: 1,
      };
      accum.push(newGenreInfo);
    } else {
      genreInfo.count++;
    }

    return accum;
  }, []);
  result.sort((genreA, genreB) => genreB.count - genreA.count);
  result.splice(5);
  return result;
}

function getMostPopularBooks(books) {
  const popularBooks = books.map((book) => ({
    name: book.title,
    count: book.borrows.length,
  }));
  popularBooks.sort((bookA, bookB) => bookB.count - bookA.count);
  return popularBooks.slice(0, 5);
}


function getMostPopularAuthors(books, authors) {
  return authors.map(author => {
    author.count = books.filter(book => book.authorId === author.id).reduce((author, book) => author + (book.borrows && book.borrows.length || 0), 0);
    author.name = `${author.name.first} ${author.name.last}`;
    delete author.id
    return author
  }).sort((authorA, authorB) => authorB.count - authorA.count).slice(0, 5);
}


module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
