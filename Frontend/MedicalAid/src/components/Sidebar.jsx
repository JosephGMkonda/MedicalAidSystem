import {
  BsGrid3X3GapFill,
  BsPeopleFill,
  BsGear,
  BsFillCartPlusFill,
  BsBoxFill,
} from "react-icons/bs";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Sidebar = () => {

  const {user} = useSelector((state) => state.auth);

  const linksByRole = {
    admin: [
      { to: "/", icon: <BsGrid3X3GapFill />, label: "Dashboard" },
      { to: "/users", icon: <BsPeopleFill />, label: "Users" },
      { to: "/inventory", icon: <BsBoxFill />, label: "Inventory" },
      { to: "/orders", icon: <BsFillCartPlusFill />, label: "Orders" },
      { to: "/settings", icon: <BsGear />, label: "Settings" },
    ],

    user: [
      { to: "/", icon: <BsGrid3X3GapFill />, label: "Dashboard" },
      { to: "/invetoryManager", icon: <BsBoxFill />, label: "Inventory" },
    ],

    client: [
      { to: "/", icon: <BsGrid3X3GapFill />, label: "Products" },
      { to: "/clientOrder", icon: <BsBoxFill />, label: "Available Inventory" },
    ]
  }

  const userLinks = linksByRole[user?.role] || [];




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

      {userLinks.map((link, index) => (
        <Link
          key={index}
          to={link.to}
          className="group flex items-center gap-[15px] py-[20px] px-[20px] cursor-pointer hover:scale-105 hover:bg-gray-100 transition-transform duration-300"
        >
          {link.icon}
          <span className="font-semibold">{link.label}</span>
        </Link>
      ))}

     

     



    </div>
  );
};

export default Sidebar;
