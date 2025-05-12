import React, { useState } from 'react';
import axios from 'axios';
import { Container, Card, Form, Button, ProgressBar, ToggleButton, ButtonGroup } from 'react-bootstrap';
import { GoogleLogin } from '@react-oauth/google';
import { useDropzone } from 'react-dropzone';

function formatBytes(bytes) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

function Compressor({ user, setUser }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [compressedBlob, setCompressedBlob] = useState(null);
  const [quality, setQuality] = useState(80);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [preview, setPreview] = useState(null);
  const [compressedPreview, setCompressedPreview] = useState(null);
  const [compressionType, setCompressionType] = useState('lossy');

  const onDrop = (acceptedFiles) => {
    if (acceptedFiles && acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      handleFile(file);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/jpeg': ['.jpeg', '.jpg'],
      'image/png': ['.png'],
      'image/webp': ['.webp'],
      'image/svg+xml': ['.svg']
    },
    multiple: false
  });

  const handleFile = (file) => {
    if (file && (
      file.type === 'image/jpeg' ||
      file.type === 'image/png' ||
      file.type === 'image/webp' ||
      file.type === 'image/svg+xml'
    )) {
      setSelectedFile(file);
      setError('');
      const previewUrl = URL.createObjectURL(file);
      setPreview(previewUrl);
      setCompressedBlob(null);
      setCompressedPreview(null);
    } else {
      setError('Please select a valid image file (JPEG, PNG, WebP, SVG)');
      setSelectedFile(null);
      setPreview(null);
      setCompressedBlob(null);
      setCompressedPreview(null);
    }
  };

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    handleFile(file);
  };

  const handleQualityChange = (event) => {
    setQuality(event.target.value);
  };

  const handleCompressionType = (val) => {
    setCompressionType(val);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!selectedFile) {
      setError('Please select an image first');
      return;
    }

    setLoading(true);
    setError('');
    setCompressedBlob(null);
    setCompressedPreview(null);

    const formData = new FormData();
    formData.append('image', selectedFile);
    formData.append('quality', quality);
    formData.append('compressionType', compressionType);

    try {
      const response = await axios.post('/compress', formData, {
        responseType: 'blob'
      });
      setCompressedBlob(response.data);
      const compressedUrl = window.URL.createObjectURL(response.data);
      setCompressedPreview(compressedUrl);
    } catch (err) {
      setError('Error compressing image. Please try again.');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    if (compressedBlob && selectedFile) {
      const url = window.URL.createObjectURL(compressedBlob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `compressed_${selectedFile.name}`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    }
  };

  if (!user) {
    return (
      <Container className="py-5">
        <Card className="main-card text-center">
          <Card.Body>
            <h2 className="mb-4">Sign in to Compress Images</h2>
            <GoogleLogin
              onSuccess={credentialResponse => {
                setUser(credentialResponse);
              }}
              onError={() => {
                alert('Login Failed');
              }}
              size="large"
              shape="circle"
            />
          </Card.Body>
        </Card>
      </Container>
    );
  }

  // Color variables for toggles and dropzone
  const purple = '#80009c';
  const white = '#fff';
  const black = '#181818';
  const darkPurple = '#3d0149'; // deep purple for dark mode backgrounds
  const isDark = document.body.classList.contains('dark');
  const dropzoneBg = isDark ? darkPurple : (isDragActive ? white : '#fafafa');
  const dropzoneText = isDark ? white : black;

  return (
    <Container className="py-5">
      <Card className="main-card">
        <Card.Header className="text-center">
          <h1 className="mb-0">Image Compressor</h1>
        </Card.Header>
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <div {...getRootProps()} className={`dropzone mb-3 ${isDragActive ? 'active' : ''}`}
              style={{
                border: `2px dashed ${black}`,
                borderRadius: 8,
                padding: 24,
                textAlign: 'center',
                background: dropzoneBg,
                color: dropzoneText,
                cursor: 'pointer',
                marginBottom: 24
              }}
            >
              <input {...getInputProps()} />
              <p style={{ margin: 0 }}>
                {isDragActive ? 'Drop the image here ...' : 'Drag & drop an image here, or click to select (JPG, PNG, WebP, SVG)'}
              </p>
            </div>
            <Form.Group className="mb-4">
              <Form.Label>Or select image</Form.Label>
              <Form.Control
                type="file"
                accept="image/jpeg,image/png,image/webp,image/svg+xml"
                onChange={handleFileSelect}
                className="custom-file-input"
              />
            </Form.Group>

            <ButtonGroup className="mb-3 w-100">
              <ToggleButton
                id="lossy"
                type="radio"
                variant={compressionType === 'lossy' ? 'dark' : 'outline-dark'}
                name="compressionType"
                value="lossy"
                checked={compressionType === 'lossy'}
                onChange={() => handleCompressionType('lossy')}
                style={{ borderColor: black, color: compressionType === 'lossy' ? white : black, background: compressionType === 'lossy' ? purple : white }}
              >
                Lossy
              </ToggleButton>
              <ToggleButton
                id="lossless"
                type="radio"
                variant={compressionType === 'lossless' ? 'dark' : 'outline-dark'}
                name="compressionType"
                value="lossless"
                checked={compressionType === 'lossless'}
                onChange={() => handleCompressionType('lossless')}
                style={{ borderColor: black, color: compressionType === 'lossless' ? white : black, background: compressionType === 'lossless' ? purple : white }}
              >
                Lossless
              </ToggleButton>
            </ButtonGroup>

            <Form.Group className="mb-4">
              <Form.Label>Compression Quality: {quality}%</Form.Label>
              <Form.Range
                min="10"
                max="100"
                value={quality}
                onChange={handleQualityChange}
                className="custom-range"
                disabled={compressionType === 'lossless'}
              />
              <ProgressBar
                now={quality}
                className="mt-2"
                variant="custom-purple"
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
              className="w-100 submit-button mb-3"
            >
              {loading ? 'Compressing...' : 'Compress Image'}
            </Button>
          </Form>

          {/* Live Preview & Size Comparison */}
          {selectedFile && (
            <div className="row mt-4">
              <div className="col-12 col-md-6 mb-3 mb-md-0 text-center">
                <h5>Original</h5>
                <img
                  src={preview}
                  alt="Original Preview"
                  className="img-preview img-fluid"
                  style={{ maxHeight: 200 }}
                />
                <div className="mt-2 text-muted" style={{ fontSize: 14 }}>
                  {selectedFile.name} <br />
                  {formatBytes(selectedFile.size)}
                </div>
              </div>
              <div className="col-12 col-md-6 text-center">
                <h5>Compressed</h5>
                {compressedPreview ? (
                  <>
                    <img
                      src={compressedPreview}
                      alt="Compressed Preview"
                      className="img-preview img-fluid"
                      style={{ maxHeight: 200 }}
                    />
                    <div className="mt-2 text-muted" style={{ fontSize: 14 }}>
                      {compressedBlob && formatBytes(compressedBlob.size)}
                    </div>
                    <Button
                      variant="success"
                      className="mt-2"
                      onClick={handleDownload}
                      disabled={!compressedBlob}
                    >
                      Download
                    </Button>
                  </>
                ) : (
                  <div className="text-muted mt-4">No compressed image yet</div>
                )}
              </div>
            </div>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
}

export default Compressor; 