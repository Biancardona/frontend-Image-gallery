import api from './api.js';

export const imageService = {
    async uploadImage(formData) {
        const response = await api.post('/images/upload', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    },

    async getImages() {
        const response = await api.get('/images');
        return response.data;
    },

    async getImage(id) {
        const response = await api.get(`/images/${id}`);
        return response.data;
    },

    async updateImage(id, imageData) {
        const response = await api.put(`/images/${id}`, imageData);
        return response.data;
    },

    async deleteImage(id) {
        const response = await api.delete(`/images/${id}`);
        return response.data;
    },

    getImageUrl(filename) {
        return `${api.defaults.baseURL.replace('/api', '')}/uploads/${filename}`;
    }
}; 