import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faYoutube, faTiktok } from '@fortawesome/free-brands-svg-icons';

import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white">
            <div className="container mx-auto py-8">
                <div className="flex flex-col items-center">
                    <p className="text-lg font-semibold mb-4">HC BLOG</p>
                    <p className="text-sm mb-4">Chia sẻ thông tin hàng ngày với bạn</p>
                </div>

                <div className="mt-4 flex justify-center space-x-4">
                    <a href="#" className="text-gray-400 hover:text-white">
                    <FontAwesomeIcon icon={faFacebook} />
                    </a>
                    <a href="#" className="text-gray-400 hover:text-white">
                    <FontAwesomeIcon icon={faYoutube} />
                    </a>
                    <a href="#" className="text-gray-400 hover:text-white">
                    <FontAwesomeIcon icon={faTiktok} />
                    </a>
                </div>
                <div className="mt-8 text-sm text-gray-400">
                    <Link to="#" className="hover:underline">
                        Điều khoản sử dụng
                    </Link>
                    <span className="mx-2">•</span>
                    <Link to="#" className="hover:underline">
                        Chính sách bảo mật
                    </Link>
                </div>
                <div className="mt-4 text-sm text-gray-400">
                    &copy; 2023 HC BLOG. All rights reserved.
                </div>
            </div>
        </footer>
    );
}

export default Footer;
