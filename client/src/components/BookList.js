import { useState } from 'react';
import { useQuery } from '@apollo/client';
import { getBooksQuery } from '../queries/queries';
import BookDetails from './BookDetails';

function BookList() {
  const [selectedId, setSelectedId] = useState(null);
  const { loading, error, data } = useQuery(getBooksQuery);

  if (loading) return <p>Loading books...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div id="main">
      <ul id="book-list">
        {data.books.map((book) => (
          <li
            key={book.id}
            onClick={() => {
              setSelectedId(book.id);
            }}
          >
            {book.name}
          </li>
        ))}
      </ul>
      <BookDetails bookId={selectedId} />
    </div>
  );
}

export default BookList;
