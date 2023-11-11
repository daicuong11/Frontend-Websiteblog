import { Link } from "react-router-dom";

const Header = (props) => {
    return (
        <header className="bg-red-500 h-20">
            <div className="container mx-auto flex items-center justify-between h-full">
                <div className="text-white text-lg font-bold">Logo</div>
                <nav className="space-x-4">
                    <Link to="/" className="text-white">Home</Link>
                    <Link to="/about" className="text-white">About</Link>
                    <Link to="/contact" className="text-white">Contact</Link>
                </nav>
            </div>
        </header>
    );
}

export default Header;
