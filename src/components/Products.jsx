import Product from './ImageCard';

const Products = ({ products }) => {
  return (
    <div className='grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 p-4'>
      {products.length ? (
        <>
          {products.slice(0, 20).map((product) => (
            <div key={product.id}>
              <Product productProp={product} />
            </div>
          ))}
        </>
      ) : (
        <>
          <h2 className='text-3xl font-bold text-center sol-span-full'>
            No hay productos disponibles
          </h2>{' '}
        </>
      )}
    </div>
  );
};

export default Products;
