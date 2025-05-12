import React, { useState, useRef, createContext } from 'react';
import axios from 'axios';
import { Container, Card, Form, Button, ProgressBar } from 'react-bootstrap';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import NavigationBar from './components/Navbar';
import Contact from './pages/Contact';
import Pricing from './pages/Pricing';
import Compressor from './pages/Compressor';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

export const ThemeContext = createContext();

function Home() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [quality, setQuality] = useState(80);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [preview, setPreview] = useState(null);
  const [showCompressor, setShowCompressor] = useState(false);
  const compressorRef = useRef(null);
  const navigate = useNavigate();

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file && (file.type === 'image/jpeg' || file.type === 'image/png')) {
      setSelectedFile(file);
      setError('');
      const previewUrl = URL.createObjectURL(file);
      setPreview(previewUrl);
    } else {
      setError('Please select a valid image file (JPEG or PNG)');
      setSelectedFile(null);
      setPreview(null);
    }
  };

  const handleQualityChange = (event) => {
    setQuality(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!selectedFile) {
      setError('Please select an image first');
      return;
    }

    setLoading(true);
    setError('');

    const formData = new FormData();
    formData.append('image', selectedFile);
    formData.append('quality', quality);

    try {
      const response = await axios.post('/compress', formData, {
        responseType: 'blob'
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `compressed_${selectedFile.name}`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      setError('Error compressing image. Please try again.');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleGetStarted = () => {
    navigate('/compress');
  };

  return (
    <>
      <div className="hero-section">
        <div className="hero-content text-center">
          <h1 className="hero-title">Compress Images Effortlessly</h1>
          <h2 className="hero-subtitle">Fast, secure, and high-quality image compression for everyone.</h2>
          <p className="hero-desc">
            Upload your images, choose your quality, and download optimized files in seconds.
          </p>
          <div className="hero-actions d-flex justify-content-center gap-3 mt-4">
            <button className="cta-btn" onClick={handleGetStarted}>Get Started →</button>
          </div>
        </div>
      </div>
      {showCompressor && (
        <Container className="py-5" ref={compressorRef}>
          <Card className="main-card">
            <Card.Header className="text-center">
              <h1 className="mb-0">Image Compressor</h1>
            </Card.Header>
            <Card.Body>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-4">
                  <Form.Label>Select Image</Form.Label>
                  <Form.Control
                    type="file"
                    accept="image/jpeg,image/png"
                    onChange={handleFileSelect}
                    className="custom-file-input"
                  />
                </Form.Group>

                {preview && (
                  <div className="preview-container mb-4">
                    <img src={preview} alt="Preview" className="img-preview" />
                  </div>
                )}

                <Form.Group className="mb-4">
                  <Form.Label>Compression Quality: {quality}%</Form.Label>
                  <Form.Range
                    min="10"
                    max="100"
                    value={quality}
                    onChange={handleQualityChange}
                    className="custom-range"
                  />
                  <ProgressBar
                    now={quality}
                    className="mt-2"
                    variant="warning"
                  />
                </Form.Group>

                {error && (
                  <div className="alert alert-danger" role="alert">
                    {error}
                  </div>
                )}

                <Button
                  variant="primary"
                  type="submit"
                  disabled={loading || !selectedFile}
                  className="w-100 submit-button"
                >
                  {loading ? 'Compressing...' : 'Compress Image'}
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Container>
      )}
    </>
  );
}

function App() {
  const [theme, setTheme] = useState('light');
  const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light');
  const [user, setUser] = useState(null);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <Router>
        <div className={`app-container ${theme}`}>
          <NavigationBar theme={theme} toggleTheme={toggleTheme} user={user} setUser={setUser} />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/compress" element={<Compressor user={user} setUser={setUser} />} />
          </Routes>
        </div>
      </Router>
    </ThemeContext.Provider>
  );
}

export default App; 