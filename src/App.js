import React from 'react'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'
import SearchBooks from './SearchBooks'
import BooksShelf from './BooksShelf'

class BooksApp extends React.Component {
  state = {
    books: []
  }

  updateBoook = (book, newShelf) => {
    this.setState((currentState) => ({
      books: currentState.books.map((b) => {
        if (b.id === book.id) {
          b.shelf = newShelf
          BooksAPI.update(book, newShelf)
        }
        return b
      })
    }))
  }

  componentDidMount() {
    BooksAPI.getAll()
      .then((books) => {
        this.setState(() => ({
          books: books
        }))
        console.log(this.state);
      })
  }

  render() {
    console.log(this.state);
    return (
      <div className="app">

        <Route exact path='/' render={() => (
          <BooksShelf
            books={this.state.books}
            onShelfUpdate={this.updateBoook}
          />
        )} />

        <Route path='/search' render={() => (
          <SearchBooks />
        )} />

      </div>
    )
  }
}

export default BooksApp
