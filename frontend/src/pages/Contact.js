import React, { useState } from 'react';
import { Container, Card, Form, Button } from 'react-bootstrap';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
    // Reset form
    setFormData({ name: '', email: '', message: '' });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <Container className="py-5">
      <Card className="main-card">
        <Card.Header className="text-center">
          <h1 className="mb-0">Contact Us</h1>
        </Card.Header>
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Enter your name"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="Enter your email"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Message</Form.Label>
              <Form.Control
                as="textarea"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={4}
                placeholder="Enter your message"
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="submit-button">
              Send Message
            </Button>
          </Form>

          <div className="mt-4">
            <h3>Other Ways to Reach Us</h3>
            <p>Email: wadnereapurv18@gmail.com</p>
            <p>Phone: 91 9420950916</p>
            
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default Contact; 