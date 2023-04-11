import { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import {
  getAuthorsQuery,
  addBookMutation,
  getBooksQuery,
} from '../queries/queries';

function AddBook() {
  const [name, setName] = useState('');
  const [genre, setGenre] = useState('');
  const [authorId, setAuthorId] = useState('');
  const { loading, error, data } = useQuery(getAuthorsQuery);
  const [
    addBook,
    { data: addBookData, loading: addBookLoading, error: addBookError },
  ] = useMutation(addBookMutation);

  if (error || addBookError)
    return <p>Error: {error.message || addBookError.message}</p>;

  const submitForm = (e) => {
    e.preventDefault();
    addBook({
      variables: {
        name,
        genre,
        authorId,
      },
      refetchQueries: [{ query: getBooksQuery }],
    });
  };

  return (
    <form id="add-book" onSubmit={submitForm}>
      <div className="field">
        <label htmlFor="book-name">Book name: </label>
        <input
          id="book-name"
          type="text"
          onChange={(event) => setName(event.currentTarget.value)}
          value={name}
        />
      </div>
      <div className="field">
        <label htmlFor="genre">Genre: </label>
        <input
          id="genre"
          type="text"
          onChange={(event) => setGenre(event.currentTarget.value)}
          value={genre}
        />
      </div>
      <div className="field">
        <label htmlFor="author">Author: </label>
        <select
          name="author"
          id="author"
          onChange={(event) => setAuthorId(event.currentTarget.value)}
        >
          {loading || addBookLoading ? (
            <option>Loading Authors...</option>
          ) : (
            <>
              <option value="">Select Author</option>
              {data.authors.map((author) => (
                <option key={author.id} value={author.id}>
                  {author.name}
                </option>
              ))}
            </>
          )}
        </select>
        <button type="submit">
          {addBookLoading ? 'Submitting...' : 'Submit'}
        </button>
      </div>
    </form>
  );
}

export default AddBook;
