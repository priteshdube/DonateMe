import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

//@ts-ignore
import { logo, sun } from '../assets';
import { navlinks } from '../constants';

// Define types for the props
interface IconProps {
  styles?: string;
  name?: string;
  imgUrl: string;
  isActive?: string;
  disabled?: boolean;
  handleClick?: () => void;
}

const Icon: React.FC<IconProps> = ({ styles, name, imgUrl, isActive, disabled, handleClick }) => (
  <div
    className={`w-[48px] h-[48px] rounded-[10px] ${isActive === name ? 'bg-[#2d3748]' : 'bg-[#4a5568]'} flex justify-center items-center ${
      !disabled ? 'cursor-pointer hover:bg-[#2d3748] transition duration-200' : 'cursor-not-allowed'
    } ${styles}`}
    onClick={handleClick}
  >
    <img
      src={imgUrl}
      alt={name}
      className={`w-1/2 h-1/2 ${isActive !== name ? 'grayscale' : ''}`}
    />
  </div>
);

const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState<string>('dashboard'); 

  return (
    <div className="flex justify-between items-center flex-col sticky top-5 h-[93vh] bg-gradient-to-b from-[#2d3748] to-[#1a202c] rounded-xl shadow-lg">
      <Link to="/">
        <Icon styles="w-[52px] h-[52px] bg-[#4a5568] mb-10 mt-5" imgUrl={logo} />
      </Link>

      <div className="flex-1 flex flex-col justify-between items-center bg-[#1a202c] rounded-xl w-[76px] py-4 mt-12">
        <div className="flex flex-col justify-center items-center gap-6">
          {navlinks.map((link) => (
            <Icon
              key={link.name}
              {...link}
              isActive={isActive}
              handleClick={() => {
                if (!link.disabled) {
                  setIsActive(link.name);
                  navigate(link.link);
                }
              }}
            />
          ))}
        </div>

        {/* Sun Icon for Dark Mode */}
        <Icon styles="bg-[#2d3748] shadow-md mt-6" imgUrl={sun} />
      </div>
    </div>
  );
};

export default Sidebar;
