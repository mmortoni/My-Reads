import React from 'react'
import { Router, Route, Switch } from 'react-router-dom'
import createHistory from 'history/createBrowserHistory'

import SkyLight from 'react-skylight'

//Components
import * as BooksAPI from '../api/BooksAPI'
import Searchpage from '../pages/search/Searchpage'
import BookShelf from '../model/BookShelf'
import ConstantsList from '../util/constants'
import BookInfoModal from '../templates/Templates'

import '../style/App.css'

const history = createHistory()

class BooksApp extends React.Component {
  state = {
    books: [],
    loading: true,
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

  showModal = (id) => {
    this.setState({
      selected: this.state.books.find(book => book.id === id)
    })

    this.animated.show()
  }

  render() {
    const { books, loading, selected } = this.state

    return (
      <div className="app">
        <Router history={history}>
          <Switch>
            <Route
              path='/search'
              render={() => (
                <Searchpage
                  moveToShelf={ this.moveToShelf }
                />
              )}
            />
            <Route
              exact path='/'
              render={() => (
                <BookShelf
                  books={ books }
                  loadState={ loading }
                  moveToShelf={ this.moveToShelf }
                  showModal={ this.showModal }
                />
              )}
            />
          </Switch>
        </Router>

        <SkyLight dialogStyles={ ConstantsList.BIGGREENDIALOG } hideOnOverlayClicked ref={ ref => this.animated = ref }>
          <BookInfoModal selected={selected} />
        </SkyLight>
      </div>
    )
  }
}

export default BooksApp
