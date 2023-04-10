import { useState } from 'react';
import { useQuery } from '@apollo/client';
import { getAuthorsQuery } from '../queries/queries';

function AddBook() {
  const [name, setName] = useState('');
  const [genre, setGenre] = useState('');
  const [authorId, setAuthorId] = useState('');
  const { loading, error, data } = useQuery(getAuthorsQuery);

  if (error) return <p>Error: {error.message}</p>;

  const submitForm = (e) => {
    e.preventDefault();
    console.log({
      name,
      genre,
      authorId,
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
          {loading ? (
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
        <button type="submit">Submit</button>
      </div>
    </form>
  );
}

export default AddBook;
