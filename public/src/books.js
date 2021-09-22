function findAuthorById(authors, id) {
  return authors.find((author) => author.id === id);
}

function findBookById(books, id) {
  return books.find((book) => book.id === id);
}

function partitionBooksByBorrowedStatus(books) {
  const returnedBooks = [];
  const checkedOut = [];
  let status = [checkedOut, returnedBooks];
  books.forEach((book) => {
    const isBookReturned = book.borrows[0].returned;
    return !isBookReturned ? checkedOut.push(book) : returnedBooks.push(book)
  });
  status.push(checkedOut);
  status.push(returnedBooks);
  return status;
}

//Helper function
function findAccountById(accounts, id) {
  return accounts.find(account => account.id == id)
}

function getBorrowersForBook(book, accounts) {
  let transactions = book.borrows;
  let result = transactions.map((transaction) => {
    //Calls helper function
    const accInfo = findAccountById(accounts, transaction.id)
    const newTransaction = {
      ...transaction,
      ...accInfo,
    };
    return newTransaction;
  });
  result.splice(10);
  return result;
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
