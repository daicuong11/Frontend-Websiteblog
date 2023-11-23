import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
    const backgroundImageStyle = {
        backgroundImage: `url(${'/backgroundImage.gif'})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    };

    return (
        <div className="flex items-center justify-center h-screen" style={backgroundImageStyle}>
            <div className="flex-col justify-between items-center">
                <div className='text-center'>
                    <h1 className="text-6xl font-bold text-red-500 mb-4">404</h1>
                    <p className="text-xl text-gray-700">Not Found</p>
                </div>
                <div className='mt-10'>
                    <Link className='p-4 text-center font-semibold rounded-lg text-white bg-green-500 hover:bg-green-700' to={'/'} >Quay về trang chủ</Link>
                </div>
            </div>
        </div>
    );
}

export default NotFound;
