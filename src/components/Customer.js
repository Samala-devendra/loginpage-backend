
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Customer() {
  // Define a state variable to store the customer data
  const [books, setBooks] = useState([]); 
  
  // Set initial state to an empty array
  const initialData = [
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

  // Disable ESLint rule for missing dependency array warning
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token'); // Get the token from localStorage
      try {
        // Send a request to fetch customer data
        const response = await axios.get('http://localhost:3009/api/data/customerData', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setBooks(response.data.books);  // Set the response data to the books state
      } catch (error) {
        console.error('Error fetching customer data:', error);
        setBooks(initialData); // Fallback to initialData if there's an error
      }
    };
    fetchData();
  }, []); // Empty dependency array ensures this runs only once when the component mounts

  return (
    <div>
      <h2>Customer Dashboard</h2>
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
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Customer;
