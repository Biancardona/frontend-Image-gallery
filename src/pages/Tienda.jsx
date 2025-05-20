// src/pages/Store.jsx
import Products from '../components/Products';
import productsData from '../mocks/products.json';

const Tienda = () => {
  const products = productsData;

  return (
    <div className='p-6'>
      <h1 className='text-4xl font-bold mb-6 text-center text-indigo-700'>
        Todos los Productos
      </h1>
      <Products products={products} />
    </div>
  );
};

export default Tienda;
