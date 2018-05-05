import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './App.css'
import ShelfList from './ShelfList'

class SearchBooks extends Component {

  state = {
    query: '',
    searchedBooks: []
  }

  updateQuery = (query) => {
    this.props.searchBook(query).then((books) => {
      books = books ? books.error ? [] : books : []
      console.log(books)

      books = books.map((book) => {
        let shelf = this.props.booksMap.get(book.id)
        if(shelf) {
          book['shelf']=shelf
        }else {
          book['shelf']='none'
        }
        return book
      })

      this.setState(() => ({
        searchedBooks: books
      }))
    })
    this.setState(() => ({
      query: query
    }))
  }

  render() {
    const { query } = this.state
    const { onShelfUpdate } = this.props


    return(
      <div className="search-books">
        <div className="search-books-bar">
          <Link
            to='/'
            className='close-search'
          >Close</Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              value={query}
              onChange={(event) => this.updateQuery(event.target.value)}
            />

          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
          <ShelfList
            booksArray={this.state.searchedBooks}
            onShelfUpdate={onShelfUpdate}
          />
          </ol>
        </div>
      </div>
    )

  }

}

export default SearchBooks
