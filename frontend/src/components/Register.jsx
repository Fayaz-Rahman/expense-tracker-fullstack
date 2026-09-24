import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Register() {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const navigate = useNavigate();

    async function handleSubmit(event) {

        event.preventDefault();

        setError("");
        setSuccess("");

        try {

            const response = await fetch(
                "http://localhost:8081/api/auth/register",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        name: name,
                        email: email,
                        password: password
                    })
                }
            );

            if (!response.ok) {

                const message = await response.text();

                throw new Error(
                    message || "Registration failed"
                );
            }

            const data = await response.json();

            console.log(data);

            setSuccess(
                "Registration successful. Redirecting to login..."
            );

            setName("");
            setEmail("");
            setPassword("");

            setTimeout(() => {
                navigate("/login");
            }, 1000);

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
                        Create your account
                    </h1>

                    <p>
                        Start tracking and understanding your spending.
                    </p>

                </div>


                <form
                    className="auth-form"
                    onSubmit={handleSubmit}
                >

                    <div className="form-group">

                        <label htmlFor="register-name">
                            Name
                        </label>

                        <input
                            id="register-name"
                            type="text"
                            value={name}
                            onChange={event =>
                                setName(event.target.value)
                            }
                            autoComplete="name"
                            placeholder="Enter your name"
                            required
                        />

                    </div>


                    <div className="form-group">

                        <label htmlFor="register-email">
                            Email
                        </label>

                        <input
                            id="register-email"
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

                        <label htmlFor="register-password">
                            Password
                        </label>

                        <input
                            id="register-password"
                            type="password"
                            value={password}
                            onChange={event =>
                                setPassword(event.target.value)
                            }
                            autoComplete="new-password"
                            placeholder="Create a password"
                            minLength="6"
                            required
                        />

                        <span className="field-hint">
                            Minimum 6 characters
                        </span>

                    </div>


                    {success && (
                        <div className="form-message success">
                            {success}
                        </div>
                    )}


                    {error && (
                        <div className="form-message error">
                            {error}
                        </div>
                    )}


                    <button
                        className="primary-button auth-submit-button"
                        type="submit"
                    >
                        Create Account
                    </button>

                </form>


                <div className="auth-footer">

                    <p>
                        Already have an account?
                        {" "}
                        <Link to="/login">
                            Login
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

export default Register;