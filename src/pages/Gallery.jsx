import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useImages } from '../hooks/useImages';
import { imageService } from '../services/image.service';

const Gallery = () => {
  const { user } = useAuth();
  const { images, loading, error, fetchImages, uploadImage, deleteImage } =
    useImages();
  const [selectedFile, setSelectedFile] = useState(null);
  const [description, setDescription] = useState('');
  const [isPublic, setIsPublic] = useState(false);

  useEffect(() => {
    fetchImages();
  }, [fetchImages]);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedFile) return;

    try {
      await uploadImage(selectedFile, description, isPublic);
      setSelectedFile(null);
      setDescription('');
      setIsPublic(false);
    } catch (error) {
      console.error('Upload error:', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this image?')) {
      try {
        await deleteImage(id);
      } catch (error) {
        console.error('Delete error:', error);
      }
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className='container mx-auto px-4 py-8'>
      <h1 className='text-3xl font-bold mb-8'>My Gallery</h1>

      {/* Upload Form */}
      <form onSubmit={handleSubmit} className='mb-8 p-4 bg-gray-100 rounded-lg'>
        <div className='mb-4'>
          <label className='block mb-2'>Select Image</label>
          <input
            type='file'
            accept='image/*'
            onChange={handleFileChange}
            className='w-full p-2 border rounded'
          />
        </div>

        <div className='mb-4'>
          <label className='block mb-2'>Description</label>
          <input
            type='text'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className='w-full p-2 border rounded'
            placeholder='Enter image description'
          />
        </div>

        <div className='mb-4'>
          <label className='flex items-center'>
            <input
              type='checkbox'
              checked={isPublic}
              onChange={(e) => setIsPublic(e.target.checked)}
              className='mr-2'
            />
            Make Public
          </label>
        </div>

        <button
          type='submit'
          disabled={!selectedFile}
          className='bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-300'
        >
          Upload Image
        </button>
      </form>

      {/* Image Grid */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {images.map((image) => (
          <div key={image.id} className='border rounded-lg overflow-hidden'>
            <img
              src={imageService.getImageUrl(image.filename)}
              alt={image.description || 'Gallery image'}
              className='w-full h-48 object-cover'
            />
            <div className='p-4'>
              <p className='text-gray-600'>{image.description}</p>
              <p className='text-sm text-gray-500'>
                {new Date(image.createdAt).toLocaleDateString()}
              </p>
              <button
                onClick={() => handleDelete(image.id)}
                className='mt-2 text-red-500 hover:text-red-700'
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gallery;
