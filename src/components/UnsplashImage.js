import React from 'react';
import axios from 'axios';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export const UnsplashImage = ({ imageData, data, setData }) => {
  const onDelete = () => {
    axios
      .delete(`${process.env.REACT_APP_API_ENDPOINT}/images/${imageData.id}`)
      .then((res) => {
        const newData = data.filter((img) => img.id !== imageData.id);
        setData(newData);
      });
  };

  return (
    <div className='container-image'>
      <Image
        className='image'
        src={imageData.filename}
        alt='DefaultImage'
        rounded
      />
      <Button
        variant='outline-danger'
        className='image-button'
        size='sm'
        onClick={onDelete}
      >
        Delete
      </Button>
      <span className='image-label'>{imageData.label}</span>
    </div>
  );
};
