import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useStateContext } from '../context';
import CustomButton from './CustomButton';
//@ts-ignore
import { logo, menu, search, thirdweb } from '../assets';
import { navlinks } from '../constants';

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState<string>('dashboard');
  const [toggleDrawer, setToggleDrawer] = useState<boolean>(false);
  const { address, connectToMetamask } = useStateContext();

  return (
    <div className="flex justify-between items-center py-4 px-6 bg-gradient-to-r from-[#1f2937] to-[#111827] shadow-lg rounded-lg">
      {/* Search Bar */}
      <div className="flex items-center bg-[#2d3748] rounded-full w-full max-w-[458px] py-2 pl-4 pr-2">
        <input
          type="text"
          placeholder="Search for campaigns"
          className="flex-grow bg-transparent text-white placeholder:text-[#cbd5e0] font-semibold text-sm outline-none"
        />
        <div className="w-[42px] h-[42px] bg-[#38b2ac] rounded-full flex justify-center items-center cursor-pointer hover:bg-[#2f8f83] transition duration-200">
          <img src={search} alt="search" className="w-[18px] h-[18px] object-contain" />
        </div>
      </div>

      {/* Desktop Navbar (Create Campaign / Profile) */}
      <div className="hidden sm:flex items-center gap-4">
        <CustomButton
          btnType="button"
          title={address ? 'Create a campaign' : 'Connect'}
          styles={`w-full md:w-auto py-2 px-4 rounded-full ${address ? 'bg-[#38b2ac]' : 'bg-[#6b46c1]'} text-white text-sm font-semibold hover:opacity-80 transition duration-200`}
          handleClick={() => {
            if (address) navigate('create-campaign');
            else connectToMetamask();
          }}
        />
        <Link to="/profile">
          <div className="w-[52px] h-[52px] rounded-full bg-[#2d3748] flex justify-center items-center">
            <img src={thirdweb} alt="user" className="w-[60%] h-[60%] object-contain" />
          </div>
        </Link>
      </div>

      {/* Mobile Navbar (Logo and Menu) */}
      <div className="sm:hidden flex items-center gap-4">
        <div className="w-[40px] h-[40px] bg-[#2d3748] rounded-full flex justify-center items-center cursor-pointer hover:bg-[#2b6cb0] transition duration-200">
          <img src={logo} alt="logo" className="w-[60%] h-[60%] object-contain" />
        </div>
        <img
          src={menu}
          alt="menu"
          className="w-[34px] h-[34px] object-contain cursor-pointer hover:opacity-80 transition duration-200"
          onClick={() => setToggleDrawer(prev => !prev)}
        />
      </div>

      {/* Mobile Drawer */}
      <div className={`absolute top-0 right-0 left-0 bg-[#1f2937] z-10 shadow-lg py-4 ${!toggleDrawer ? '-translate-y-full' : 'translate-y-0'} transition-transform duration-300`}>
        <ul className="space-y-4 px-4">
          {navlinks.map((link) => (
            <li
              key={link.name}
              className={`flex items-center gap-4 p-4 ${isActive === link.name && 'bg-[#4a5568]'}`}
              onClick={() => {
                setIsActive(link.name);
                setToggleDrawer(false);
                navigate(link.link);
              }}
            >
              <img
                src={link.imgUrl}
                alt={link.name}
                className={`w-[24px] h-[24px] object-contain ${isActive === link.name ? 'grayscale-0' : 'grayscale'}`}
              />
              <p className={`text-[14px] font-epilogue font-semibold ${isActive === link.name ? 'text-[#38b2ac]' : 'text-[#a0aec0]'}`}>
                {link.name}
              </p>
            </li>
          ))}
        </ul>
        <div className="px-4 py-2">
          <CustomButton
            btnType="button"
            title={address ? 'Create a campaign' : 'Connect'}
            styles={`w-full py-2 px-4 rounded-full ${address ? 'bg-[#38b2ac]' : 'bg-[#6b46c1]'} text-white text-sm font-semibold hover:opacity-80 transition duration-200`}
            handleClick={() => {
              if (address) navigate('create-campaign');
              else connectToMetamask();
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
