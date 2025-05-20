import Products from '../components/Products';
import productsData from '../mocks/products.json';
import { Link } from 'react-router-dom';

const Home = () => {
  const products = productsData;

  const streetWear = products.filter((p) => p.category === 'SW');
  const minimalTees = products.filter((p) => p.category === 'MT');

  return (
    <div>
      <div className='p-4 space-y-12'>
        <section>
          <div className='text-center mb-4'>
            <h2 className='text-3xl font-bold text-center text-indigo-600'>
              Street Wear
            </h2>
            <Link
              to='/tienda/SW'
              className='text-indigo-400 hover:underline hover:text-indigo-600'
            >
              Ver todo &rarr;
            </Link>
          </div>
          <Products products={streetWear.slice(0, 5)} />
        </section>
        <section>
          <div className='text-center mb-4'>
            <h2 className='text-3xl text-center font-bold text-pink-600'>
              Minimal Tees
            </h2>
            <Link
              to='/tienda/MT'
              className='text-pink-400 hover:underline hover:text-pink-600'
            >
              Ver todo &rarr;
            </Link>
          </div>
          <Products products={minimalTees.slice(0, 5)} />
        </section>
      </div>
    </div>
  );
};

export default Home;
