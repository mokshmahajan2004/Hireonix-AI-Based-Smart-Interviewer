import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white shadow-md px-6 py-4 flex justify-between items-center">
      <div className="flex items-center space-x-2">
        <h1 className="text-xl font-bold text-blue-600">Smart Interviewer</h1>
      </div>
      <div className="space-x-6">
        <a href="#hero" className="text-gray-700 hover:text-blue-600">Home</a>
        <a href="#about" className="text-gray-700 hover:text-blue-600">About</a>
        <a href="#services" className="text-gray-700 hover:text-blue-600">Services</a>
      </div>
      <Link to="/login" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
        Login
      </Link>
    </nav>
  );
}

export default Navbar;

