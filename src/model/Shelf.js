import React from 'react'
import { PropTypes } from 'prop-types'

//Components
import Book from './Book'

const Shelf = (props) => {
    const { books, moveToShelf, shelf, showModal } = props

    return (
        <div className='shelf'>
            {books.filter(book => book.shelf === shelf).map(book => (
                <Book key={book.id} book={book} moveToShelf={moveToShelf} showModal={showModal} />
            ))}
        </div>
    )
}

Shelf.propTypes = {
    books: PropTypes.array.isRequired,
    moveToShelf: PropTypes.func.isRequired,
    shelf: PropTypes.string.isRequired,
    showModal: PropTypes.func.isRequired
}

export default Shelf
