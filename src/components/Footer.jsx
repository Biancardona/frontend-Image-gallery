import { FaInstagram, FaFacebookF, FaTwitter } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className='bg-gray-900 text-white py-8 mt-12'>
      <div className='container mx-auto px-4 flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0'>
        {/* Enlaces */}
        <div className='flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6 text-sm'>
          <Link to='/login'>Login</Link>
          <Link to='/register'>Register</Link>
        </div>

        {/* Redes sociales */}
        <div className='flex space-x-4'>
          <a
            href='https://instagram.com'
            target='_blank'
            rel='noopener noreferrer'
            className='hover:text-pink-400'
          >
            <FaInstagram size={20} />
          </a>
          <a
            href='https://facebook.com'
            target='_blank'
            rel='noopener noreferrer'
            className='hover:text-blue-400'
          >
            <FaFacebookF size={20} />
          </a>
          <a
            href='https://twitter.com'
            target='_blank'
            rel='noopener noreferrer'
            className='hover:text-sky-400'
          >
            <FaTwitter size={20} />
          </a>
        </div>
      </div>
      <div className='text-center text-xs text-gray-400 mt-10'>
        © {new Date().getFullYear()} TeeLab. Todos los derechos reservados.
      </div>
    </footer>
  );
};

export default Footer;
