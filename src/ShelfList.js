import React from 'react'

const ShelfList = (props) => {

  return(
    props.booksArray.map((book, index) => (
      <li key={index}>
        <div className="book">
          <div className="book-top">
            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
            <div className="book-shelf-changer">
              <select value={book.shelf} onChange={(event) => props.onShelfUpdate(book, event.target.value)}>
                <option value="none" disabled>Move to...</option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
              </select>
            </div>
          </div>
          <div className="book-title">{book.title}</div>
          {book.authors.map((author, index) => (
            <div key={index} className="book-authors">{author}</div>
          ))}
        </div>
      </li>
    ))
  )
}

export default ShelfList
