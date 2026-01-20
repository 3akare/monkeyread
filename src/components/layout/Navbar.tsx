import { Link } from 'react-router-dom';
import { Settings, Info, Keyboard } from 'lucide-react';

const Navbar = () => {
    return (
        <header className="w-full max-w-7xl mx-auto py-8 px-4 flex justify-start items-center gap-12">
            <Link to="/" className="flex items-center gap-3">
                <Keyboard className="w-8 h-8 text-main" />
                <h1 className="text-2xl font-bold tracking-tight text-text">
                    monkey<span className="text-main">read</span>
                </h1>
            </Link>

            <div className="flex items-center gap-6">
                <Link to="/about" className="p-2 hover:bg-sub/10 rounded-md transition-colors" title="about">
                    <Info className="w-6 h-6 text-sub hover:text-text transition-colors" />
                </Link>
                <Link to="/settings" className="flex items-center p-2 hover:bg-sub/10 rounded-md transition-colors" title="Settings">
                    <Settings className="w-6 h-6 text-sub hover:text-text transition-colors" />
                </Link>
            </div>
        </header>
    );
};

export default Navbar;
