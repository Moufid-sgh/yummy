import { Link } from "react-router-dom"
import { useState, useEffect } from 'react';
import logo from "/logo.svg"
import orange from "/orange.svg"
import HamburgerMenu from "./HamburgerMenu"
import Navigation from "./Navigation"
import Menu from "./Menu"



const Navbar = () => {

  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://yahalawa.net/api/orange/menu');

        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }

        const result = await response.json();
        setData(result)
      } catch (error) {
        setError(error.message)
      } finally {
        setLoading(false)
      }
    };

    fetchData();
  }, []);



  return (
    <nav dir="rtl">

      <div className="flex items-center justify-between px-3 md:px-8 lg:px-32 py-8 z-50">
        {/* for desktop--------------------------------------- */}
        <div className="hidden lg:flex w-1/3">
          <Menu />
        </div>
        {/* -------------------------------------------------- */}

        {/* for mobile-------------------------------------- */}
        <HamburgerMenu data={data} />
        {/* ------------------------------------------------ */}


        <Link to="/" className="w-1/3 flex justify-center">
          <img
            src={logo}
            className='w-36 lg:w-56 cursor-pointer'
            alt="logo"
          />
        </Link>

        <div className="w-1/3 flex justify-end">
          <img
            src={orange}
            alt="orange"
            className="w-12 lg:w-auto"
          />
        </div>
      </div>

      <Navigation data={data} />
    </nav>
  )
}

export default Navbar