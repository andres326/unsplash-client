import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import axios from 'axios';

export const UploadButton = ({ data, setData }) => {
  const [show, setShow] = useState(false);
  const [validated, setValidated] = useState(false);
  const [form, setForm] = useState({
    label: '',
    filename: '',
  });

  const resetForm = () =>
    setForm({
      label: '',
      filename: '',
    });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleUploadImage = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const form = event.currentTarget;
    if (form.checkValidity() !== false) {
      axios
        .post(`${process.env.REACT_APP_API_ENDPOINT}/images`, form, {
          headers: {
            'Content-Type': 'application/json',
          },
        })
        .then((res) => {
          const newData = [{ ...res.data, show: true }, ...data];
          setData(newData);
          setValidated(false);
          resetForm();
          handleClose();
        })
        .catch((err) => {
          setValidated(false);
          resetForm();
          handleClose();
        });
    }
    setValidated(true);
  };

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  return (
    <>
      <Button variant='success' className='ms-auto' onClick={handleShow}>
        Add a photo
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add a new photo</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form noValidate validated={validated} onSubmit={handleUploadImage}>
            <Form.Group className='mb-3' controlId='label'>
              <Form.Label>Label</Form.Label>
              <Form.Control
                type='text'
                placeholder='Put your label here'
                name='label'
                value={form.label}
                onChange={handleChange}
                required
              />
              <Form.Control.Feedback type='invalid'>
                Please put a label.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className='mb-3' controlId='url'>
              <Form.Label>Photo url</Form.Label>
              <Form.Control
                type='url'
                placeholder='Put your photo url here'
                name='filename'
                value={form.filename}
                onChange={handleChange}
                required
              />
              <Form.Control.Feedback type='invalid'>
                Please put a url.
              </Form.Control.Feedback>
            </Form.Group>
            <div className='d-flex flex-row-reverse'>
              <Button type='submit' variant='success'>
                Submit
              </Button>
              <Button
                className='me-2'
                variant='outline-secondary'
                onClick={handleClose}
              >
                Cancel
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};
