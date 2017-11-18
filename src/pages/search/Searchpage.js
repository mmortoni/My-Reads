import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { Debounce } from 'react-throttle'

import SkyLight from 'react-skylight'

//Components 
import * as BooksAPI from '../../api/BooksAPI'
import Book from '../../model/Book'
import ConstantsList from '../../util/constants'
import BookInfoModal from '../../templates/Templates'

class Searchpage extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      query: '',
      searchLoading: false,
      results: [],
      selected: {}
    }
  }

  updateQuery = (query) => {
    this.setState({ query },
      () => {
        if (query.length > 0) {
          this.search(this.state.query, 40)
        }
      })
  }

  showModal = (id) => {
    this.setState({
      selected: this.state.results.find(book => book.id === id)
    })

    this.animated.show()
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

  render() {
    const { searchLoading, results, selected } = this.state

    let books

    if (Object.prototype.toString.call(results) === '[object Array]') {
      books = results.map((book) => {
        return (
          <Book key={ book.id } book={ book } moveToShelf={ this.props.moveToShelf } showModal={ this.showModal } />
        )
      })
    }

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to='/' className="close-search">Close</Link>

          <div className="search-books-input-wrapper">
            <Debounce time="500" handler="onChange">
              <input type="text" placeholder="Search by title or author" onChange={ (e) => this.updateQuery(e.target.value) } />
            </Debounce>
          </div>
        </div>

        <div className="search-books-results">
          { searchLoading && <div className="loader">Loading search results...</div> } <br />
          <div className="loader">{ (Object.prototype.toString.call(results) === '[object Array]') ? `Showing ${ books.length } results` : '' }<br /><br /></div>
          <div className="loader">{ (Object.prototype.toString.call(results) === '[object Object]') ? `No results` : '' }<br /><br /></div>
          <ol className="books-grid">
            { books }
          </ol>
        </div>

        <SkyLight dialogStyles={ ConstantsList.BIGGREENDIALOG } hideOnOverlayClicked ref={ ref => this.animated = ref }>
          <BookInfoModal selected={ selected } />
        </SkyLight>
      </div>
    )
  }
}

Searchpage.propTypes = {
  moveToShelf: PropTypes.func.isRequired
}

export default Searchpage
