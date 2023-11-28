import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faBars, faArrowLeft, faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../../hooks/useAuth";
import { actions } from "../../auth";
import { Link } from "react-router-dom";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Tooltip } from "@mui/material";
import PropTypes from 'prop-types'

Header.propTypes = {
  isCollapse: PropTypes.bool,
  onClick: PropTypes.func,
};

export default function Header({ onClick, isCollapse }) {
  const [state, dispatch] = useAuth();
  const { user } = state
  const [isOpen, setIsOpen] = useState(false)
  const toggleDropdown = () => setIsOpen(!isOpen)

  const handleLogout = () => {
    dispatch(actions.logout());
    window.location.replace("/auth");
  };
  return (
    <div className="absolute bg-white shadow-md py-6 px-4 flex items-center justify-between top-0 left-0 bottom-20 right-0 h-20 z-50">
      {isCollapse && <Tooltip placement="right" arrow title="Mở ra">
        <FontAwesomeIcon
        onClick={onClick}
        className="text-black text-2xl p-3 rounded-lg cursor-pointer hover:bg-slate-800 hover:bg-opacity-20"
        icon={faBars}
      /></Tooltip>}

      {!isCollapse && <Tooltip placement="right" arrow title="Thu nhỏ"><FontAwesomeIcon
        onClick={onClick}
        className="text-black text-2xl p-3 rounded-lg cursor-pointer hover:bg-slate-800 hover:bg-opacity-20"
        icon={faArrowLeft}
      /></Tooltip>}


      <div className="flex items-center justify-between">
        <p className="text-black font-semibold mr-2">{user?.name || 'Quản trị viên'}</p>
        {state.user && <div className="p-2 relative">
          <FontAwesomeIcon onClick={toggleDropdown} className="text-black rounded-full bg-green-500 w-6 h-6 text-xl p-2 cursor-pointer" icon={faUser} />
          {state?.user &&
            isOpen && (
              <div className="p-4 w-[280px] bg-white shadow-md border rounded-sm absolute top-full right-0 transition-transform">
                <div className="text-black flex flex-col items-start">
                  <div className="border-b-[1px] border-slate-400 flex flex-col gap-6 pb-4 w-full">
                    <div className="flex items-center gap-3">
                    <AccountCircleIcon fontSize='large' />
                      <div className="flex flex-col items-start">
                        <span className="font-bold mb-1">{user?.name}</span>
                      </div>
                    </div>
                  </div>

                  <Link
                    to="/"
                    className="px-4 cursor-pointer mt-2 flex items-center justify-start w-full text-left py-2 hover:bg-slate-500 hover:bg-opacity-10"
                  >
                    Trang người dùng
                  </Link>
                  <div
                    onClick={handleLogout}
                    className="cursor-pointer mt-2 flex items-center justify-start w-full text-left py-2 hover:bg-slate-500 hover:bg-opacity-10"
                  >
                    <FontAwesomeIcon className="px-2 text-black text-md rotate-180" icon={faArrowRightFromBracket} />
                    Đăng xuất
                  </div>
                </div>
              </div>

            )
          }
        </div>}
      </div>
    </div>
  );
}
