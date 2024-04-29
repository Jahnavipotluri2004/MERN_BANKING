//Datafetch.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
const Datafetch = () => {
  const [data, setData] = useState([]);
  const [subname, setSubname] = useState('');
  useEffect(() => {
    axios
      .get('http://localhost:32124/subjects')
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data: ', error);
      });
  }, []);
  const addSubject = (event) => {
    event.preventDefault();
    const subObject = {
      id: data.length + 1,
      name: subname,
    };
    axios
      .post('http://localhost:32124/BankInformation', subObject)
      .then((response) => {
        setData(response.data);
        setSubname(''); 
      })
      .catch((error) => {
        console.error('Error in posting data', error);
      });
  };
  return (
    <div>
      <h2>Data fetched from the API:</h2>
      <ul style={{ listStyle: 'none' }}>
        {data.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
      <form onSubmit={addSubject}>
        <input type="text" value={subname} onChange={(e) => setSubname(e.target.value)} />
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default Datafetch;
