import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

//Components
import Loader from './halogen/GridLoader'
import Shelf from './Shelf'
import Shelves from './helpers/Shelves'

const BookShelf = (props) => {
    const { books, loadState, moveToShelf, showModal } = props

    return (
        <div className="list-books">
            <div className="list-books-title">
                <h1>My Reads</h1>
            </div>

            <div className="list-books-content">
                {Shelves.map(item => (
                    <div key={ item.id } className="bookshelf">
                        <h2 className="bookshelf-title">{ item.description }</h2>
                        <Loader loading={ loadState } color="#2e7c31" size="16px" margin="4px" className="loader" />
                        <div className="bookshelf-books">
                            <ol className="books-grid">
                                <Shelf books={ books } moveToShelf={ moveToShelf } shelf={ item.code } showModal={ showModal } />
                            </ol>
                        </div>
                    </div>
                ))}
           </div>

            <div className="open-search">
                <Link to='/search'>Add a book</Link>
            </div>
        </div>
    )
}

BookShelf.propTypes = {
    books: PropTypes.array.isRequired,
    loadState: PropTypes.bool.isRequired,
    moveToShelf: PropTypes.func.isRequired,
    showModal: PropTypes.func.isRequired
}

export default BookShelf
