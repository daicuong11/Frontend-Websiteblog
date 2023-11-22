import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white">
            <div className="container mx-auto py-8">
                <div className="flex items-center justify-center">
                    <p className="text-lg">Website tin tức</p>
                </div>
                <div className="mt-4 flex justify-center">
                    <Link to="#" className="text-gray-400 hover:text-white mx-2">
                        Home
                    </Link>
                    <Link to="#" className="text-gray-400 hover:text-white mx-2">
                        Categories
                    </Link>
                    <Link to="#" className="text-gray-400 hover:text-white mx-2">
                        About Us
                    </Link>
                    <Link to="#" className="text-gray-400 hover:text-white mx-2">
                        Contact
                    </Link>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
