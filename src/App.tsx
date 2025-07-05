import {Toaster} from "react-hot-toast";
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import { Outlet } from 'react-router';

const App = () => {
  return (
    <div>
      <Navbar />
      <div className="bg-[#f5f4f2] py-12 min-h-screen">
        <Outlet />
        <Toaster />
      </div>
      <Footer />
    </div>
  );
};

export default App;