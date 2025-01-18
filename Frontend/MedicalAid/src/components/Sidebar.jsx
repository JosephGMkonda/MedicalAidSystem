import {
  BsGrid3X3GapFill,
  BsPeopleFill,
  BsGear,
  BsFillCartPlusFill,
  BsBoxFill,
} from "react-icons/bs";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="bg-[#fdfdfd] h-full w-[18%] fixed top-0 left-0 z-50">
      
      <div className="px-[20px] py-[10px] items-center justify-center border-b-[1px]">
        <div className="flex items-center justify-center cursor-pointer">
          <img
            src="logo2.jpg"
            alt="Logo"
            className="w-12 h-12 rounded-full object-cover"
          />
          <span className="px-2">
            <h4>MedicalAid Logistic</h4>
          </span>
        </div>
      </div>

      
      <Link
        to="/dashboard"
        className="group flex items-center gap-[15px] py-[20px] px-[20px] cursor-pointer hover:scale-105 hover:bg-gray-100 transition-transform duration-300"
      >
        <BsGrid3X3GapFill className="text-sm transition-transform duration-300 group-hover:scale-125" />
        <span className="font-semibold"> Dashboard </span>
      </Link>

      <Link
        to="/patients"
        className="group flex items-center gap-[15px] py-[20px] px-[20px] cursor-pointer hover:scale-105 hover:bg-gray-100 transition-transform duration-300"
      >
        <BsPeopleFill className="text-sm transition-transform duration-300 group-hover:scale-125" />
        <span className="font-semibold"> Users </span>
      </Link>

      <Link
        to="/inventory"
        className="group flex items-center gap-[15px] py-[20px] px-[20px] cursor-pointer hover:scale-105 hover:bg-gray-100 transition-transform duration-300"
      >
        <BsBoxFill className="text-sm transition-transform duration-300 group-hover:scale-125" />
        <span className="font-semibold"> Inventory </span>
      </Link>

      <Link
        to="/orders"
        className="group flex items-center gap-[15px] py-[20px] px-[20px] cursor-pointer hover:scale-105 hover:bg-gray-100 transition-transform duration-300"
      >
        <BsFillCartPlusFill className="text-sm transition-transform duration-300 group-hover:scale-125" />
        <span className="font-semibold"> Orders </span>
      </Link>

      <Link
        to="/settings"
        className="group flex items-center gap-[15px] py-[20px] px-[20px] cursor-pointer hover:scale-105 hover:bg-gray-100 transition-transform duration-300"
      >
        <BsGear className="text-sm transition-transform duration-300 group-hover:scale-125" />
        <span className="font-semibold"> Settings </span>
      </Link>
    </div>
  );
};

export default Sidebar;
