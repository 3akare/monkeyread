import { Link } from 'react-router-dom';
import { Settings, Info, Keyboard } from 'lucide-react';

const Navbar = () => {
    return (
        <header className="w-full max-w-5xl mx-auto py-8 px-4 flex justify-between items-center">
            <Link to="/" className="flex items-center gap-3 group">
                <Keyboard className="w-8 h-8 text-main group-hover:scale-110 transition-transform" />
                <h1 className="text-2xl font-bold tracking-tight text-text">
                    monkey<span className="text-main">read</span>
                </h1>
            </Link>

            <div className="flex items-center gap-6">
                <Link to="/info" className="p-2 hover:bg-sub/10 rounded-md transition-colors" title="Info">
                    <Info className="w-6 h-6 text-sub hover:text-text transition-colors" />
                </Link>
                <Link to="/settings" className="flex items-center gap-2 p-2 hover:bg-sub/10 rounded-md transition-colors group" title="Settings">
                    <Settings className="w-6 h-6 text-sub group-hover:text-text transition-colors" />
                    <span className="text-sub group-hover:text-text text-sm font-medium transition-colors">settings</span>
                </Link>
            </div>
        </header>
    );
};

export default Navbar;
