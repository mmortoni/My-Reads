import React from 'react'
import { PropTypes } from 'prop-types'

const Book = (props) => {
    const { book, moveToShelf, showModal } = props

    return (
        <li>
            <div className="book">
                <div className="book-top">
                    <div onClick={() => showModal(book.id)} 
                        className="book-cover" 
                        style={ { width: 128, height: 193,backgroundImage: `url(${ book.imageLinks ? book.imageLinks.thumbnail : process.env.PUBLIC_URL + "/blank.jpg" })` } }>
                    </div>
                
                    <div className="book-shelf-changer">
                        <select onChange={(e) => { moveToShelf(book, e.target.value); }} defaultValue={book.shelf}>
                            <option value="none" disabled>Move to shelf...</option>
                            <option value="currentlyReading">Currently Reading</option>
                            <option value="wantToRead">Want to Read</option>
                            <option value="read">Read</option>
                            <option value="none">None</option>
                        </select>
                    </div>
                </div>
                <div className="book-title">{book.title}</div>
                {book.authors && (
                    <div className="book-authors">
                        {book.authors.map((author) => (
                            <span key={author} className="author-name"> {author}</span>
                        ))}
                    </div>
                )}
            </div>
        </li>
    )
}

Book.propTypes = {
    book: PropTypes.object.isRequired,
    moveToShelf: PropTypes.func.isRequired,
    showModal: PropTypes.func.isRequired
}

export default Book