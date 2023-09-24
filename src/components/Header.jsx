import React, { useState, useEffect } from 'react';
import { HiOutlineSearch } from 'react-icons/hi';
import { SlMenu } from 'react-icons/sl';
import { VscChromeClose } from 'react-icons/vsc';
import { useNavigate, useLocation } from 'react-router-dom';

// import './css/header.scss';
import './css/header2.scss';

import ContentWrapper from './ContentWrapper';
import logo from '../assets/movix-logo.svg';

const Header = () => {
  const [show, setShow] = useState('top');
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [query, setQuery] = useState('');
  const [showSearch, setShowSearch] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
  const openSearch = () => {
    setMobileMenu(false);
    setShowSearch(true);
  };
  const openMobilMenu = () => {
    setMobileMenu(true);
    setShowSearch(false);
  };
  const searchQueryHandler = event => {
    if (event.key === 'Enter' && query.length > 0) {
      navigate(`/search/${query}`);
      setTimeout(() => {
        setShowSearch(false);
      }, 1000);
    }
  };
  const controllNavbar = () => {
    if (window.scrollY > 200) {
      if (window.scrollY > lastScrollY && !mobileMenu) {
        setShow('hide');
      } else {
        setShow('show');
      }
      setLastScrollY(window.scrollY);
    }
  };
  useEffect(() => {
    window.addEventListener('scroll', controllNavbar);
    return () => {
      window.removeEventListener('scroll', controllNavbar);
    };
  }, [lastScrollY]);

  return (
    <header
      className={` ${show} fixed top-0 left-0 w-full p-4 z-[2] ${
        mobileMenu ? 'mobileView' : ''
      }`}
    >
      <ContentWrapper>
        <div className="contaner  flex items-center justify-between">
          <img
            src={logo}
            alt=""
            className="  cursor-pointer hover:text-[#9d174d]"
          />

          <ul className="menuItems  items-center justify-center gap-7 hidden lg:flex ">
            <li
              className="menuItem  cursor-pointer hover:text-[#9d174d]"
              onClick={() => {
                navigate('/explore/movie');
                setMobileMenu(false);
              }}
            >
              Movies
            </li>
            <li
              className="menuItem  cursor-pointer hover:text-[#9d174d]"
              onClick={() => {
                navigate('/explore/tv');
                setMobileMenu(false);
              }}
            >
              TV Shows
            </li>
            <li className="menuItem  cursor-pointer hover:text-[#9d174d]">
              <HiOutlineSearch onClick={openSearch} />
            </li>
          </ul>
          <div className="mobileMenu flex items-center gap-5  lg:hidden">
            <HiOutlineSearch onClick={openSearch} className="text-2xl" />
            {mobileMenu ? (
              <VscChromeClose
                className="text-2xl"
                onClick={() => setMobileMenu(false)}
              />
            ) : (
              <SlMenu className="text-2xl" onClick={openMobilMenu} />
            )}
          </div>
        </div>
      </ContentWrapper>
      {showSearch && (
        <div className="showSearch fixed top-0 left-0 w-full mt-14  ">
          <ContentWrapper>
            <div className="serarchInput flex w-full items-center justify-center md:px-10 px-5 gap-3 ">
              <input
                className=" w-full h-10 bg-white text-gray-800 border-0 outline-none  pl-5 text-sm  md:h-16 md:text-xl md:py-0 md:px-8 transition-all duration-300 ease-in-out"
                type="text"
                placeholder="Search for movies or tv shows...."
                onKeyUp={searchQueryHandler}
                onChange={e => setQuery(e.target.value)}
              />
              <VscChromeClose
                className="text-2xl"
                onClick={() => setShowSearch(false)}
              />
            </div>
          </ContentWrapper>
        </div>
      )}
    </header>
  );
};

export default Header;
