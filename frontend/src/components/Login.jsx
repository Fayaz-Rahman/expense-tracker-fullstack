import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../context/useAuth";

function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const { login } = useAuth();
    const navigate = useNavigate();

    async function handleSubmit(event) {

        event.preventDefault();
        setError("");

        try {

            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/api/auth/login`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        email: email,
                        password: password
                    })
                }
            );

            if (!response.ok) {
                throw new Error(
                    "Invalid email or password"
                );
            }

            const token = await response.text();

            login(token);

            navigate("/dashboard");

        } catch (error) {

            setError(error.message);

        }
    }

    return (
        <main className="auth-page">

            <div className="auth-card">

                <div className="auth-brand">
                    ET
                </div>

                <div className="auth-heading">

                    <p className="auth-eyebrow">
                        PERSONAL FINANCE
                    </p>

                    <h1>
                        Welcome back
                    </h1>

                    <p>
                        Sign in to continue managing your expenses.
                    </p>

                </div>


                <form
                    className="auth-form"
                    onSubmit={handleSubmit}
                >

                    <div className="form-group">

                        <label htmlFor="login-email">
                            Email
                        </label>

                        <input
                            id="login-email"
                            type="email"
                            value={email}
                            onChange={event =>
                                setEmail(event.target.value)
                            }
                            autoComplete="email"
                            placeholder="Enter your email"
                            required
                        />

                    </div>


                    <div className="form-group">

                        <label htmlFor="login-password">
                            Password
                        </label>

                        <input
                            id="login-password"
                            type="password"
                            value={password}
                            onChange={event =>
                                setPassword(event.target.value)
                            }
                            autoComplete="current-password"
                            placeholder="Enter your password"
                            required
                        />

                    </div>


                    {error && (
                        <div className="form-message error">
                            {error}
                        </div>
                    )}


                    <button
                        className="primary-button auth-submit-button"
                        type="submit"
                    >
                        Login
                    </button>

                </form>


                <div className="auth-footer">

                    <p>
                        Don't have an account?
                        {" "}
                        <Link to="/register">
                            Create an account
                        </Link>
                    </p>

                    <Link
                        className="back-home-link"
                        to="/"
                    >
                        Back to home
                    </Link>

                </div>

            </div>

        </main>
    );
}

export default Login;