import { BsFillBellFill } from "react-icons/bs";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LogOutUser,reset} from "../features/AunthSlice";
import { useNavigate } from "react-router-dom";


const Navbar = () => {
    const [showDropdown, setShowDropdown] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {user} = useSelector((state) => state.auth); 



    const handleLogout = () => {
        dispatch(LogOutUser());
        dispatch(reset());
        navigate("/login");

    };

    return (
        <div className="flex items-center justify-between h-[70px] shadow-lg px-[25px] py-[20px] bg-white fixed top-0 left-0 w-full z-40">
            <div>
                <h1>CareLogix</h1>
            </div>

            <div className="flex items-center">
                <div className="relative px-[0px]">
                    <BsFillBellFill className="text-xl" />
                    <span className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 
                                    inline-flex items-center justify-center 
                                    w-5 h-5 text-xs font-bold text-white bg-red-500 rounded-full">
                        3
                    </span>
                </div>

                <div className="flex items-center px-[20px] relative">
                    <p>Jo</p>
                    <div onClick={() => setShowDropdown(!showDropdown)}>
                        <img 
                            src="personImg.jpeg" 
                            alt="Profile" 
                            className="w-10 h-10 rounded-full object-cover cursor-pointer"
                        />
                    </div>

                    {showDropdown && (
                        <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-md overflow-hidden">
                            <ul>
                                <li 
                                    onClick={() => console.log('Profile clicked')} 
                                    className="px-4 py-2 hover:bg-gray-200 cursor-pointer">
                                    Profile
                                </li>
                                <li 
                                    onClick={handleLogout} 
                                    className="px-4 py-2 hover:bg-gray-200 cursor-pointer">
                                    Logout
                                </li>
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Navbar;
