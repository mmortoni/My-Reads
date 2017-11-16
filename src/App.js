import React from 'react'
import { Router, Route, Switch } from 'react-router-dom'
import createHistory from 'history/createBrowserHistory'

import SkyLight from 'react-skylight'
import Stars from 'react-stars'

//Components
import * as BooksAPI from './BooksAPI'
import Searchpage from './Searchpage'
import BookShelf from './components/BookShelf'
import ConstantsList from './components/helpers/constants'
import BookModal from './components/helpers/Templates'

import './App.css'

const history = createHistory()

class BooksApp extends React.Component {
  state = {
    books: [],
    loading: true,
    searchLoading: false,
    results: [],
    selected: {}
  }

  getAllBooks = () => {
    BooksAPI.getAll().then((books) => {
      this.setState({
        books,
        loading: false
      })
    })
  }

  componentDidMount() {
    this.getAllBooks()
  }

  moveToShelf = (book, shelf) => {
    BooksAPI.update(book, shelf).then(() => {
      this.getAllBooks()
    })
  }

  search = (query, maxResults) => {
    this.setState({
      searchLoading: true
    })

    BooksAPI.search(query, maxResults).then(results => {
      this.setState({
        searchLoading: false,
        results: results
      })
    })
  }

  showModal = (id) => {
    this.setState({
      selected: this.state.books.find(book => book.id === id)
    })

    this.animated.show()
  }

  render() {
    const { books, loading, searchLoading, results, selected } = this.state

    return (
      <div className="app">
        <Router history={history}>
          <Switch>
            <Route
              path='/search'
              render={() => (
                <Searchpage
                  search={this.search}
                  searchLoading={searchLoading}
                  results={results}
                  moveToShelf={this.moveToShelf}
                />
              )}
            />
            <Route
              exact path='/'
              render={() => (
                <BookShelf
                  books={books}
                  loadState={loading}
                  moveToShelf={this.moveToShelf}
                  showModal={this.showModal}
                />
              )}
            />
          </Switch>
        </Router>

        <SkyLight dialogStyles={ ConstantsList.BIGGREENDIALOG } hideOnOverlayClicked ref={ref => this.animated = ref}>
          <BookModal selected={ selected } />
        </SkyLight>
    </div>
    )
  }
}

export default BooksApp
