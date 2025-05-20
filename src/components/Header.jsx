import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
  const { logout, user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className='py-10 bg-indigo-600'>
      <div className='container mx-auto flex flex-col lg:flex-row justify-between items-center'>
        <Link to='/' className='font-bold text-2xl text-indigo-200 text-center'>
          Image <span className='text-white'>Factory</span>
        </Link>

        <div className='flex items-center space-x-4'>
          {isAuthenticated ? (
            <>
              <Link to='/gallery' className='text-white hover:text-indigo-200'>
                Gallery
              </Link>
              {user?.role === 'admin' && (
                <Link to='/admin' className='text-white hover:text-indigo-200'>
                  Admin
                </Link>
              )}
              <button
                type='button'
                className='text-white hover:text-indigo-200'
                onClick={handleLogout}
              >
                Cerrar Sesión
              </button>
            </>
          ) : (
            <>
              <Link to='/login' className='text-white hover:text-indigo-200'>
                Iniciar Sesión
              </Link>
              <Link to='/register' className='text-white hover:text-indigo-200'>
                Registrarse
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
