import React, { useState } from 'react'
import { faHome, faColumns,  faArrowRightFromBracket, faAnglesRight, faMusic, faMicrophone, faDiamond, faFolder, faUser } from '@fortawesome/free-solid-svg-icons';
import SidebarItem from './SidebarItem'
import { useAuth } from '../../hooks/useAuth';
import { actions } from '../../auth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { Tooltip } from '@mui/material';
import PropTypes from 'prop-types'

Sidebar.propTypes = {
  children: PropTypes.node,
  toggle: PropTypes.bool,
};

export default function Sidebar({ children, toggle }) {

  const sidebarItemsData = [
    {
      id: 0, active: true, path: "", icon: faHome, title: "Tổng quan",
    },
    {
      id: 1, active: false, path: "account", icon: faUser, title: "Tài khoản",
    },
    {
      id: 2, active: false, path: "song", icon: faMusic, title: "Bài hát"
    },
    {
      id: 3, active: false, path: "artist", icon: faMicrophone, title: "Nghệ sĩ"
    },
    {
      id: 4, active: false, path: "genre", icon: faColumns, title: "Thể loại"
    },
    {
      id: 5, active: false, path: "package", icon: faDiamond, title: "Gói nhạc"
    },
    {
      id: 6, active: false, path: "album", icon: faFolder, title: "Bộ sưu tập"
    },



  ]

  const [sidebarItems, setSidebarItems] = useState(sidebarItemsData);
  const [state, dispatch] = useAuth()

  const handleItemClick = (itemId) => {
    const updatedItems = sidebarItems.map((item) => ({
      ...item,
      active: item.id === itemId,
    }));
    setSidebarItems(updatedItems);
  };

  const handleLogout = () => {
    dispatch(actions.logout());
    window.location.replace("/auth");
  };
  return (
    <aside className={`relative bg-zinc-800 h-screen text-white transition-all duration-500 ease-in-out ${toggle ? 'w-[80px]' : 'w-[320px]'}`}>
      {children}
      <div className="border-t-[1px] border-opacity-25 py-4 border-slate-500 px-2 overflow-y-scroll custom-scrollbar overflow-hidden">

        {
          sidebarItems.map((item, index) => (
            <SidebarItem
              key={item.id}
              data={item}
              toggle={toggle}
              onClick={() => handleItemClick(item.id)}
            />
          ))
        }

        {toggle && <Tooltip arrow title="Đăng xuất" placement='right'><FontAwesomeIcon className="border-t-[1px] border-slate-500 absolute bottom-4 flex items-center justify-center p-5 rotate-180 rounded-lg hover:bg-slate-400 hover:bg-opacity-20" icon={faArrowRightFromBracket} /></Tooltip>} 

      </div>

      {!toggle && <div className="border-t-[1px] py-4 border-slate-500 border-opacity-25 absolute bottom-0 left-0 right-0 text-md px-4 text-white flex flex-col items-start gap-2">
        
        <span className="font-bold text-xs mb-2">TÙY CHỌN</span>
        <Link className="w-full text-left cursor-pointer py-2 hover:bg-slate-400 hover:text-white hover:bg-opacity-20" to="/">
          <FontAwesomeIcon className="px-2 mr-4 text-white text-md rotate-180" icon={faAnglesRight} />
          Trang người dùng
        </Link>
      
      <div className="w-full text-left cursor-pointer py-2 hover:bg-slate-400 hover:text-white hover:bg-opacity-20" onClick={handleLogout}>
        <FontAwesomeIcon className="px-2 mr-4 text-white text-md rotate-180" icon={faArrowRightFromBracket} />
        Đăng xuất
      </div>
      
     
    </div>}
      

    </aside>
  )
}
