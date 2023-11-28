import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom';
import { Tooltip } from '@mui/material';
import PropTypes from 'prop-types'

SidebarItem.propTypes = {
  data: PropTypes.object,
  toggle: PropTypes.bool,
  onClick: PropTypes.func,
};


export default function SidebarItem({ toggle, data, onClick}) {
  
  return (
    <Link to={data.path} onClick={onClick} className="block my-3">
        <div className={`flex items-center ${toggle ? 'justify-center py-5 rounded-lg' : 'justify-start rounded-sm'} ${data.active ? "bg-slate-400 bg-opacity-20 text-white" : "bg-transparent" } py-3 text-md w-full hover:bg-slate-400 hover:text-white hover:bg-opacity-20`}
            
        >
            {toggle && <Tooltip placement='right' arrow title={data.title}><FontAwesomeIcon className="px-4" icon={data.icon} /></Tooltip>}
            {!toggle && <>
              <FontAwesomeIcon className="px-4" icon={data.icon} />
              <p className={`font-semibold pl-4'}`}>{!toggle && data.title}</p>
            </>}
        </div>
    </Link>
  )
}
