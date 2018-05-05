import React from 'react'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'
import SearchBooks from './SearchBooks'
import BooksShelf from './BooksShelf'

class BooksApp extends React.Component {
  state = {
    books: [],
    booksMap: new Map()
  }

  updateBoook = (book, newShelf) => {
    this.setState((currentState) => ({
      books: currentState.books.map((b) => {
        if (b.id === book.id) {
          b.shelf = newShelf
          BooksAPI.update(book, newShelf)
        }
        return b
      }).filter((b) => (
        b.shelf !== 'none'
      ))
    }))
  }

  addBoook = (book, newShelf) => {
    book['shelf'] = newShelf
    console.log(book)
    this.setState((currentState) => ({
      books: currentState.booksMap.get(book.id) ? currentState.books : [...currentState.books, book]
    }))
    BooksAPI.update(book, newShelf)
  }

  componentDidMount() {
    BooksAPI.getAll()
      .then((books) => {

        let newMap = new Map()
        books.forEach((book) => {
          newMap.set(book.id, book.shelf)
        })

        this.setState(() => ({
          books: books,
          booksMap: newMap
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
          <SearchBooks
            searchBook={BooksAPI.search}
            onShelfUpdate={this.addBoook}
            booksMap={this.state.booksMap}
          />
        )} />

      </div>
    )
  }
}

export default BooksApp
