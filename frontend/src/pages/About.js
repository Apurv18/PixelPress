import React from 'react';
import { Container, Card } from 'react-bootstrap';

function About() {
  return (
    <Container className="py-5">
      <Card className="main-card">
        <Card.Header className="text-center">
          <h1 className="mb-0">About Us</h1>
        </Card.Header>
        <Card.Body>
          <h2>Our Mission</h2>
          <p>
            We are dedicated to providing the best image compression service while maintaining
            the highest quality possible. Our goal is to help users optimize their images
            without compromising on visual quality.
          </p>

          <h2>What We Offer</h2>
          <ul>
            <li>High-quality image compression</li>
            <li>User-friendly interface</li>
            <li>Customizable compression settings</li>
            <li>Fast and secure processing</li>
          </ul>

          <h2>Our Technology</h2>
          <p>
            We use state-of-the-art compression algorithms to ensure the best possible
            results for your images. Our service is built with modern web technologies
            to provide a seamless experience.
          </p>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default About; 