import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { Debounce } from 'react-throttle'

import SkyLight from 'react-skylight'

//Components 
import Book from './components/Book'
import ConstantsList from './components/helpers/constants'
import BookModal from './components/helpers/Templates'

class Searchpage extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      query: '',
      selected: {}
    }
  }

  componentDidMount() {
    console.log('Search!');
  }

  updateQuery = (query) => {
    this.setState({ query },
      () => {
        if (query.length > 0) {
          this.props.search(this.state.query, 40)
        }
      })
  }

  showModal = (id) => {
    this.setState({
      selected: this.props.results.find(book => book.id === id)
    })

    this.animated.show()
  }

  render() {
    const { query, selected } = this.state

    let results

    if (Object.prototype.toString.call(this.props.results) === '[object Array]') {
      results = this.props.results.map((book) => {
        return (
          <Book key={book.id} book={book} moveToShelf={this.props.moveToShelf} showModal={this.showModal} />
        )
      })
    }

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to='/' className="close-search">Close</Link>

          <div className="search-books-input-wrapper">
            <Debounce time="500" handler="onChange">
              <input type="text" placeholder="Search by title or author" onChange={(e) => this.updateQuery(e.target.value)} />
            </Debounce>
          </div>
        </div>

        <div className="search-books-results">
          {this.props.searchLoading && <div className="loader">Loading search results...</div>}<br />
          <div className="loader">{(Object.prototype.toString.call(this.props.results) === '[object Array]') ? `Showing ${results.length} results` : ''}<br /><br /></div>
          <div className="loader">{(Object.prototype.toString.call(this.props.results) === '[object Object]') ? `No results` : ''}<br /><br /></div>
          <ol className="books-grid">
            {results}
          </ol>
        </div>

        <SkyLight dialogStyles={ ConstantsList.BIGGREENDIALOG } hideOnOverlayClicked ref={ref => this.animated = ref}>
          <BookModal selected={ selected } />
        </SkyLight>
      </div>
    )
  }
}

Searchpage.propTypes = {
  search: PropTypes.func.isRequired,
  searchLoading: PropTypes.bool.isRequired,
  results: PropTypes.array,
  moveToShelf: PropTypes.func.isRequired
}

export default Searchpage
