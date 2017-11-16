import React from 'react'
import { PropTypes } from 'prop-types'

import Stars from 'react-stars'

const BookModal = (props) => {
    const { selected } = props
    
    return (
        <section>
            <header>
                <h1>{selected.title}:&nbsp;{selected.subtitle}</h1>
                <h3>{selected.trueauthors}</h3>
                <p>{selected.publisher},&nbsp;{selected.publishedDate}&nbsp;-&nbsp;{selected.pageCount}&nbsp;pages</p>

                {selected.authors && (
                    <div>
                        <h3>
                            Author{selected.authors.length > 1 ? 's' : ''}:&nbsp;
                            <ul>
                            {selected.authors.map((author, i) => (
                                <li key={author}>
                                    {author}
                                    {selected.authors.length-1 > i ? ',' : ''}&nbsp;
                                </li>
                            ))}
                            </ul>
                        </h3>
                    </div>
                )}

                {selected.categories && (
                    <div>
                        <h3>
                            Categor{selected.categories.length > 1 ? 'ies' : 'y'}:&nbsp;
                            <ul>
                            {selected.categories.map((category, i) => (
                                <li key={category}>
                                {category}
                                {selected.categories.length-1 > i ? ',' : ''}&nbsp;
                                </li>
                            ))}
                            </ul>
                        </h3>
                    </div>
                )}
                <div>
                    <h3>
                        Rating
                                <Stars { ...{ size: 30, value: selected.averageRating, edit: false } } />
                    </h3>
                </div>
            </header>
            <p><a href={selected.previewLink} target="_blank">Link Preview</a></p>
            <div className="ellipsis">{selected.description}</div>
        </section>
    )
}

BookModal.propTypes = {
    selected: PropTypes.object.isRequired
}

export default BookModal
