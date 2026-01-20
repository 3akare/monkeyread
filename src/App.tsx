import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Reader from './pages/Reader';
import Info from './pages/Info';
import Settings from './pages/Settings';

function App() {
    return (
        <Router>
            <div className="flex flex-col min-h-screen">
                <Navbar />
                <main className="flex-grow flex flex-col justify-center items-center px-4">
                    <Routes>
                        <Route path="/" element={<Reader />} />
                        <Route path="/info" element={<Info />} />
                        <Route path="/settings" element={<Settings />} />
                    </Routes>
                </main>
                <Footer />
            </div>
        </Router>
    );
}

export default App;
