import { NavLink } from "react-router-dom";

function DashboardIcon() {
    return (
        <svg
            viewBox="0 0 24 24"
            width="18"
            height="18"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
        >
            <rect x="3" y="3" width="7" height="7" rx="1" />
            <rect x="14" y="3" width="7" height="7" rx="1" />
            <rect x="3" y="14" width="7" height="7" rx="1" />
            <rect x="14" y="14" width="7" height="7" rx="1" />
        </svg>
    );
}

function ExpenseIcon() {
    return (
        <svg
            viewBox="0 0 24 24"
            width="18"
            height="18"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
        >
            <rect x="3" y="5" width="18" height="14" rx="2" />
            <path d="M3 9h18" />
            <path d="M7 14h4" />
        </svg>
    );
}

function BudgetIcon() {
    return (
        <svg
            viewBox="0 0 24 24"
            width="18"
            height="18"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
        >
            <rect x="3" y="5" width="18" height="14" rx="2" />
            <path d="M7 9h10" />
            <path d="M7 13h4" />
            <path d="M15 13h3" />
        </svg>
    );
}

function CategoryIcon() {
    return (
        <svg
            viewBox="0 0 24 24"
            width="18"
            height="18"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
        >
            <path d="M4 5h6l2 2h8v12H4z" />
            <path d="M4 9h16" />
        </svg>
    );
}

function Sidebar({ isOpen, onNavigate }) {
    return (
        <aside
            className={`app-sidebar ${isOpen ? "is-open" : ""}`}
        >

            <div className="sidebar-brand">

                <div className="brand-mark">
                    ET
                </div>

                <div className="brand-content">

                    <h2>
                        Expense Tracker
                    </h2>

                    <span>
                        Personal finance
                    </span>

                </div>

            </div>


            <nav className="sidebar-nav">

                <p className="sidebar-section-title">
                    Overview
                </p>


                <NavLink
                    to="/dashboard"
                    className={({ isActive }) =>
                        `sidebar-link ${isActive ? "active" : ""}`
                    }
                    onClick={onNavigate}
                >
                    <DashboardIcon />

                    <span>
                        Dashboard
                    </span>
                </NavLink>


                <NavLink
                    to="/expenses"
                    className={({ isActive }) =>
                        `sidebar-link ${isActive ? "active" : ""}`
                    }
                    onClick={onNavigate}
                >
                    <ExpenseIcon />

                    <span>
                        Expenses
                    </span>
                </NavLink>


                <NavLink
                    to="/budget"
                    className={({ isActive }) =>
                        `sidebar-link ${isActive ? "active" : ""}`
                    }
                    onClick={onNavigate}
                >
                    <BudgetIcon />

                    <span>
                        Budget
                    </span>
                </NavLink>


                <NavLink
                    to="/categories"
                    className={({ isActive }) =>
                        `sidebar-link ${isActive ? "active" : ""}`
                    }
                    onClick={onNavigate}
                >
                    <CategoryIcon />

                    <span>
                        Categories
                    </span>
                </NavLink>

            </nav>


            <div className="sidebar-footer">

                <span>
                    Expense Tracker
                </span>

                <small>
                    Personal finance dashboard
                </small>

            </div>

        </aside>
    );
}

export default Sidebar;