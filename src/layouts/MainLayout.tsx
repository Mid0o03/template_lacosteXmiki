
import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import HalftoneBackground from '../components/HalftoneBackground';
import { Outlet } from 'react-router-dom';
import { applyTheme } from '../utils/theme';

const MainLayout: React.FC = () => {
    // Apply theme on mount
    React.useEffect(() => {
        applyTheme();
    }, []);

    return (
        <>
            <HalftoneBackground />
            <Navbar />
            <main>
                <Outlet />
            </main>
            <Footer />
        </>
    );
};

export default MainLayout;
