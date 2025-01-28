
import React, { useState } from 'react';

function Admin() {
  const initialBooks = [
    {
      id: 1,
      title: "The Law of Attraction",
      description: "The Secret Power of The Universe",
      dateRentedOut: '2025-01-01',
      dueDate: "2025-02-01",
      quantity: 2,
      price: 150,
    },
    {
      id: 2,
      title: "Power",
      description: "Description of Book Y",
      dateRentedOut: "2025-01-22",
      dueDate: "2025-03-01",
      quantity: 4,
      price: 170,
    },
    {
      id: 3,
      title: "Secret",
      description: "Description of Law of Attraction",
      dateRentedOut: '2025-01-01',
      dueDate: "2025-02-01",
      quantity: 2,
      price: 150,
    },
    {
      id: 4,
      title: "Mental Images",
      description: "Description of Book Mental Images",
      dateRentedOut: "2025-02-01",
      dueDate: "2025-03-01",
      quantity: 4,
      price: 170,
    },
    {
      id: 5,
      title: "Live in the End",
      description: "Live in the End",
      dateRentedOut: "2025",
      dueDate: "2025",
      quantity: 4,
      price: 350,
    },
  ];

  const [books, setBooks] = useState(initialBooks);
  const [editBook, setEditBook] = useState({
    id: null,
    title: '',
    description: '',
    dateRentedOut: '',
    dueDate: '',
    quantity: '',
    price: '',
  });

  const [newBook, setNewBook] = useState({
    title: '',
    description: '',
    quantity: '',
    price: '',
  });

  // Handle Rent Out button functionality
  const handleRentOut = (bookId) => {
    const updatedBooks = books.map((book) =>
      book.id === bookId && book.quantity > 0
        ? {
            ...book,
            quantity: book.quantity - 1,
            dateRentedOut: new Date().toISOString().split('T')[0], // Set current date
            dueDate: new Date(new Date().setDate(new Date().getDate() + 7)).toISOString().split('T')[0], // Set due date 7 days later
          }
        : book
    );
    setBooks(updatedBooks);
  };

  // Handle Return Book button functionality
  const handleReturnBook = (bookId) => {
    const updatedBooks = books.map((book) =>
      book.id === bookId
        ? {
            ...book,
            quantity: book.quantity + 1,
            dateRentedOut: '',
            dueDate: '',
          }
        : book
    );
    setBooks(updatedBooks);
  };

  // Handle Add Book button functionality
  const handleAddBook = () => {
    if (!newBook.title || !newBook.description || !newBook.quantity || !newBook.price) {
      alert('Please fill in all the details');
      return;
    }
    
    const newBookToAdd = {
      id: books.length + 1,
      title: newBook.title,
      description: newBook.description,
      dateRentedOut: '',
      dueDate: '',
      quantity: parseInt(newBook.quantity),
      price: parseFloat(newBook.price),
    };
    
    setBooks([...books, newBookToAdd]);
    // Reset new book form
    setNewBook({
      title: '',
      description: '',
      quantity: '',
      price: '',
    });
  };

  // Handle Edit button functionality
  const handleEdit = (book) => {
    setEditBook({ ...book }); // Pre-fill the edit form with the book details
  };

  const handleSave = () => {
    const updatedBooks = books.map((book) =>
      book.id === editBook.id ? { ...editBook } : book
    );
    setBooks(updatedBooks); // Update the books array with the edited details
    setEditBook({
      id: null,
      title: '',
      description: '',
      dateRentedOut: '',
      dueDate: '',
      quantity: '',
      price: '',
    }); // Reset the form
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditBook({
      ...editBook,
      [name]: value,
    });
  };

  const handleNewBookChange = (e) => {
    const { name, value } = e.target;
    setNewBook({
      ...newBook,
      [name]: value,
    });
  };

  return (
    <div>
      <h2>Admin Dashboard</h2>
      {/* Rent Out, Return Book, and Add Book Buttons */}
      <button onClick={() => handleRentOut(1)}>RENT OUT</button>
      <button onClick={() => handleReturnBook(1)}>Return Book</button>
      <button onClick={handleAddBook}>Add a book</button>

      <table border="1" style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Description</th>
            <th>Date of Renting Out</th>
            <th>Due Date</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {books.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.title}</td>
              <td>{item.description}</td>
              <td>{item.dateRentedOut}</td>
              <td>{item.dueDate}</td>
              <td>{item.quantity}</td>
              <td>{item.price}</td>
              <td>
                <button onClick={() => handleEdit(item)}>Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Edit Book Form */}
      {editBook.id && (
        <div>
          <h3>Edit Book</h3>
          <form onSubmit={(e) => e.preventDefault()}>
            <label>
              Title:
              <input
                type="text"
                name="title"
                value={editBook.title}
                onChange={handleChange}
              />
            </label>
            <br />
            <label>
              Description:
              <input
                type="text"
                name="description"
                value={editBook.description}
                onChange={handleChange}
              />
            </label>
            <br />
            <label>
              Date of Renting Out:
              <input
                type="date"
                name="dateRentedOut"
                value={editBook.dateRentedOut}
                onChange={handleChange}
              />
            </label>
            <br />
            <label>
              Due Date:
              <input
                type="date"
                name="dueDate"
                value={editBook.dueDate}
                onChange={handleChange}
              />
            </label>
            <br />
            <label>
              Quantity:
              <input
                type="number"
                name="quantity"
                value={editBook.quantity}
                onChange={handleChange}
              />
            </label>
            <br />
            <label>
              Price:
              <input
                type="number"
                name="price"
                value={editBook.price}
                onChange={handleChange}
              />
            </label>
            <br />
            <button type="button" onClick={handleSave}>
              Save Changes
            </button>
          </form>
        </div>
      )}

      {/* Add New Book Form */}
      <div>
        <h3>Add New Book</h3>
        <form onSubmit={(e) => e.preventDefault()}>
          <label>
            Title:
            <input
              type="text"
              name="title"
              value={newBook.title}
              onChange={handleNewBookChange}
            />
          </label>
          <br />
          <label>
            Description:
            <input
              type="text"
              name="description"
              value={newBook.description}
              onChange={handleNewBookChange}
            />
          </label>
          <br />
          <label>
            Quantity:
            <input
              type="number"
              name="quantity"
              value={newBook.quantity}
              onChange={handleNewBookChange}
            />
          </label>
          <br />
          <label>
            Price:
            <input
              type="number"
              name="price"
              value={newBook.price}
              onChange={handleNewBookChange}
            />
          </label>
          <br />
        </form>
      </div>
    </div>
  );
}

export default Admin;
