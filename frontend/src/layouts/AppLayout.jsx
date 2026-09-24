import { useState } from "react";
import { Outlet } from "react-router-dom";

import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

function AppLayout() {

    const [sidebarOpen, setSidebarOpen] = useState(false);

    function closeSidebar() {
        setSidebarOpen(false);
    }

    function openSidebar() {
        setSidebarOpen(true);
    }

    return (
        <div className="app-shell">

            <Sidebar
                isOpen={sidebarOpen}
                onNavigate={closeSidebar}
            />

            {sidebarOpen && (
                <button
                    className="sidebar-overlay"
                    onClick={closeSidebar}
                    aria-label="Close navigation"
                    type="button"
                />
            )}

            <div className="app-main">

                <Header
                    onMenuClick={openSidebar}
                />

                <main className="page-content">
                    <Outlet />
                </main>

            </div>

        </div>
    );
}

export default AppLayout;