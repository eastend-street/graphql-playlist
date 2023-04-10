import { gql, useQuery } from '@apollo/client';

const getAuthorsQuery = gql`
  {
    authors {
      name
      id
    }
  }
`;

function AddBook() {
  const { loading, error, data } = useQuery(getAuthorsQuery);

  if (error) return <p>Error: {error.message}</p>;

  return (
    <form id="add-book">
      <div className="field">
        <label htmlFor="book-name">Book name: </label>
        <input id="book-name" type="text" />
      </div>
      <div className="field">
        <label htmlFor="genre">Genre: </label>
        <input id="genre" type="text" />
      </div>
      <div className="field">
        <label htmlFor="author">Author: </label>
        <select name="author" id="author">
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
      </div>
    </form>
  );
}

export default AddBook;
