import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from 'axios';

function App() {
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      const reader = new FileReader();
      reader.readAsDataURL(image);
      reader.onloadend = async () => {
        const base64data = reader.result.split(',')[1];
        const response = await axios.post('http://localhost:3000/api/v1/storage/getUrl',
          {
            image: base64data,
            extension: "png",
            type:"productId"
          });
        setImageUrl(response.data.imageUrl);
      };
    } catch (error) {
      setError('Error uploading image. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    <div>
      <form onSubmit={handleFormSubmit}>
        <input type="file" onChange={handleImageChange} accept="image/*" />
        <button type="submit">Upload</button>
      </form>

      {loading && <p>Uploading image...</p>}
      {imageUrl && (
        <div>
          <p>Image uploaded successfully!</p>
          <img src={imageUrl} alt="Uploaded" />
        </div>
      )}
      {error && <p>{error}</p>}
    </div>
    </>
  )
}

export default App
