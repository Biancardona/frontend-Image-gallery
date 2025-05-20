import { useState, useCallback } from 'react';
import { imageService } from '../services/image.service.js';

export const useImages = () => {
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchImages = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await imageService.getImages();
            setImages(response.images);
        } catch (err) {
            setError(err.response?.data?.message || 'Error fetching images');
        } finally {
            setLoading(false);
        }
    }, []);

    const uploadImage = useCallback(async (file, description, isPublic) => {
        try {
            setLoading(true);
            setError(null);
            const formData = new FormData();
            formData.append('image', file);
            formData.append('description', description);
            formData.append('isPublic', isPublic);

            const response = await imageService.uploadImage(formData);
            setImages(prev => [response.image, ...prev]);
            return response;
        } catch (err) {
            setError(err.response?.data?.message || 'Error uploading image');
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    const deleteImage = useCallback(async (id) => {
        try {
            setLoading(true);
            setError(null);
            await imageService.deleteImage(id);
            setImages(prev => prev.filter(image => image.id !== id));
        } catch (err) {
            setError(err.response?.data?.message || 'Error deleting image');
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    const updateImage = useCallback(async (id, data) => {
        try {
            setLoading(true);
            setError(null);
            const response = await imageService.updateImage(id, data);
            setImages(prev => prev.map(image =>
                image.id === id ? { ...image, ...response.image } : image
            ));
            return response;
        } catch (err) {
            setError(err.response?.data?.message || 'Error updating image');
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    return {
        images,
        loading,
        error,
        fetchImages,
        uploadImage,
        deleteImage,
        updateImage
    };
}; 