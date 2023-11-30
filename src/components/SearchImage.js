import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';

export const SearchImage = ({ data, setData }) => {
  const dataOriginal = data;
  const [filename, setFilename] = useState('');

  const handleChange = (e) => {
    const value = e.target.value;
    setFilename(value);
    const newData = dataOriginal.map((img) => ({
      ...img,
      show: img.label.toLowerCase().includes(value.toLowerCase()),
    }));
    setData(newData);
  };

  return (
    <Form.Control
      type='text'
      placeholder='Search by name'
      className='w-25'
      name='filename'
      value={filename}
      onChange={handleChange}
    />
  );
};
