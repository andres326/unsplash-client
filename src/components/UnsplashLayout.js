import React, { useEffect, useState } from 'react';
import Stack from 'react-bootstrap/Stack';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import axios from 'axios';
import { UnsplashImage } from './UnsplashImage';
import { UploadButton } from './UploadButton';
import { SearchImage } from './SearchImage';
import { ReactComponent as Logo } from '../my_unsplash_logo.svg';

export const UnsplashLayout = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_ENDPOINT}/images`).then((res) => {
      const alteredData = res.data.map((img) => ({ ...img, show: true }));
      setImages(alteredData);
    });
  }, []);

  const renderListOfImages = () => {
    const elementsByList = Math.ceil(images.length / 3);
    let init = 0;
    let columns = [];
    const filterImages = images.filter((img) => img.show);
    for (let i = 0; i < 3; i++) {
      const newList = filterImages.slice(init, init + elementsByList);
      let imagesRendered = [];
      newList.forEach((img) => {
        if (!img.show) {
          return;
        }
        imagesRendered.push(
          <UnsplashImage
            imageData={img}
            data={images}
            setData={setImages}
            key={img.id}
          />
        );
      });
      columns.push(<Col className='container-col'>{imagesRendered}</Col>);
      init += elementsByList;
    }
    return columns;
  };

  return (
    <div>
      <Stack direction='horizontal' className='mb-5'>
        <Logo />
        <SearchImage data={images} setData={setImages} />
        <UploadButton data={images} setData={setImages} />
      </Stack>
      <Container className='container-layout'>{renderListOfImages()}</Container>
    </div>
  );
};
