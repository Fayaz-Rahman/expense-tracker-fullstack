import { Link, Navigate } from "react-router-dom";
import useAuth from "../context/useAuth";

function Home() {

    const { token } = useAuth();

    if (token) {
        return <Navigate to="/dashboard" replace />;
    }

    return (
        <main className="home-page">

            <div className="home-card">

                <div className="home-brand-mark">
                    ET
                </div>

                <p className="home-eyebrow">
                    PERSONAL FINANCE
                </p>

                <h1 className="home-title">
                    Expense Tracker
                </h1>

                <p className="home-description">
                    Track your expenses, understand your spending,
                    and manage your personal finances in one place.
                </p>

                <div className="home-actions">

                    <Link
                        to="/login"
                        className="home-primary-button"
                    >
                        Login
                    </Link>

                    <Link
                        to="/register"
                        className="home-secondary-button"
                    >
                        Create Account
                    </Link>

                </div>

            </div>

        </main>
    );
}

export default Home;