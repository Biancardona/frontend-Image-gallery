import React from 'react';
import { Trash2 } from 'lucide-react';

/**
define-ocg Componente reutilizable para mostrar una imagen con opciones de eliminar
@params:

image: {
id: string,
url: string,
title?: string
}

onDelete: función que se ejecuta al presionar el botón de eliminar

showDelete: booleano que indica si se debe mostrar el botón de borrar (ej. solo para usuarios propietarios o admin)
*/
const ImageCard = ({ image, onDelete, showDelete = false }) => {
  const handleDelete = () => {
    if (window.confirm('¿Deseas eliminar esta imagen?')) {
      onDelete(image.id);
    }
  };

  return (
    <div className='relative rounded-2xl overflow-hidden shadow-md group hover:shadow-xl transition-all bg-white'>
      {' '}
      <img
        src={image.url}
        alt={image.title || 'Imagen de galería'}
        className='w-full h-56 object-cover'
        loading='lazy'
      />{' '}
      {image.title && (
        <div className='absolute bottom-0 left-0 w-full bg-black/60 text-white text-sm px-3 py-2'>
          {' '}
          {image.title}{' '}
        </div>
      )}{' '}
      {showDelete && (
        <button
          onClick={handleDelete}
          className='absolute top-2 right-2 bg-white hover:bg-red-500 hover:text-white text-red-500 p-1.5 rounded-full shadow transition'
          title='Eliminar imagen'
        >
          {' '}
          <Trash2 className='w-4 h-4' />{' '}
        </button>
      )}{' '}
    </div>
  );
};

export default ImageCard;
