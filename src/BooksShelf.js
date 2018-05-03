import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './App.css'
import ShelfList from './ShelfList'

class BooksShelf extends Component {

  render() {

    const { books, onShelfUpdate } = this.props
    console.log(books);

    const currentlyReading = books.filter((book) => {
      return (book.shelf === 'currentlyReading')
    })
    const wantToRead = books.filter((book) => (
      book.shelf === 'wantToRead'
    ))
    const read = books.filter((book) => (
      book.shelf === 'read'
    ))

    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Currently Reading</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                  <ShelfList
                    booksArray={currentlyReading}
                    onShelfUpdate={onShelfUpdate}
                  />
                </ol>
              </div>
            </div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Want to Read</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                  <ShelfList
                    booksArray={wantToRead}
                    onShelfUpdate={onShelfUpdate}
                  />
                </ol>
              </div>
            </div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Read</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                  <ShelfList
                    booksArray={read}
                    onShelfUpdate={onShelfUpdate}
                  />
                </ol>
              </div>
            </div>
          </div>
        </div>
        <Link
          to='/search'
          className='open-search'
        >Add a book</Link>
      </div>

    )
  }

}

export default BooksShelf
