import { useLocation } from "react-router-dom";
import useAuth from "../context/useAuth";

function MenuIcon() {
    return (
        <svg
            viewBox="0 0 24 24"
            width="20"
            height="20"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            aria-hidden="true"
        >
            <line x1="4" y1="7" x2="20" y2="7" />
            <line x1="4" y1="12" x2="20" y2="12" />
            <line x1="4" y1="17" x2="20" y2="17" />
        </svg>
    );
}

function Header({ onMenuClick }) {

    const { logout } = useAuth();
    const location = useLocation();

    function handleLogout() {

        logout();

        // Reload the application at the public home page.
        // This guarantees AuthContext starts with no JWT.
        window.location.replace("/");
    }

    function getPageTitle() {

        const path = location.pathname;

        if (
            path === "/" ||
            path === "/dashboard"
        ) {
            return "Dashboard";
        }

        if (path.startsWith("/expenses")) {
            return "Expenses";
        }

        if (path.startsWith("/budget")) {
            return "Budget";
        }

        if (path.startsWith("/categories")) {
            return "Categories";
        }

        if (path.startsWith("/analytics")) {
            return "Analytics";
        }

        if (path.startsWith("/reminders")) {
            return "Reminders";
        }

        if (path.startsWith("/ai")) {
            return "AI Insights";
        }

        if (path.startsWith("/profile")) {
            return "Profile";
        }

        return "Dashboard";
    }

    return (
        <header className="topbar">

            <div className="topbar-left">

                <button
                    className="sidebar-toggle"
                    onClick={onMenuClick}
                    aria-label="Open navigation"
                    type="button"
                >
                    <MenuIcon />
                </button>

                <div>

                    <p className="topbar-label">
                        Workspace
                    </p>

                    <h1 className="topbar-title">
                        {getPageTitle()}
                    </h1>

                </div>

            </div>

            <div className="topbar-actions">

                <button
                    className="logout-button"
                    onClick={handleLogout}
                    type="button"
                >
                    Logout
                </button>

            </div>

        </header>
    );
}

export default Header;