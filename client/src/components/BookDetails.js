import { useQuery } from '@apollo/client';
import { getBookQuery } from '../queries/queries';

function BookDetails({ bookId }) {
  const { loading, error, data } = useQuery(getBookQuery, {
    variables: {
      id: bookId,
    },
  });

  if (loading) return <p>Loading book details...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const { book } = data;
  return (
    <div id="book-details">
      {book ? (
        <div>
          <h2>{book.name}</h2>
          <p>{book.genre}</p>
          <p>{book.author.name}</p>
          <p>All books by this author:</p>
          <ul className="other-books">
            {book.author.books.map((item) => (
              <li key={item.id}>{item.name}</li>
            ))}
          </ul>
        </div>
      ) : (
        <p>No books selected</p>
      )}
    </div>
  );
}

export default BookDetails;
