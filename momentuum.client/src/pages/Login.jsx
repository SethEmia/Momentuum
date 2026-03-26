import React, { useState, useRef, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import './Login.css';
import Logo from '../assets/momentuum_logo_white.svg?react';


/*
  Login.jsx
  - Accessible, minimal login form component
  - Client-side validation, show/hide password, and async submit placeholder
*/

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [remember, setRemember] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [showPassword, setShowPassword] = useState(false);
    const API_URL = import.meta.env.VITE_API_URL;
    const navigate = useNavigate();
    const emailRef = useRef(null);

    const token = localStorage.getItem('authToken');
    if (token) {
        return <Navigate to="/dashboard" replace />;
    }

    useEffect(() => {
        emailRef.current?.focus();
    }, []);

    function validate() {
        if (!email.trim()) {
            return "Email is required.";
        }
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            return "Please enter a valid email address.";
        }
        if (!password) {
            return "Password is required.";
        }
        return null;
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setError(null);

        const clientError = validate();
        if (clientError) {
            setError(clientError);
            return;
        }

        setLoading(true);
        try {
            const res = await fetch(`http://localhost:5144/api/Account/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });


            const data = await res.json().catch(() => ({}));

            if (!res.ok) {
                throw new Error(data?.message || "Authentication failed.");
            }

            setLoading(false);
            localStorage.setItem("authToken", data.token);
            setPassword("");
            navigate("/dashboard", {replace:true});
        } catch (err) {
            setLoading(false);
            setError(err.message || "Unable to sign in. Please try again.");
        }
    }

    return (
        <div className="login-layout">
            <div className="left-column">
                <div className="left-content">
                    <Logo className="logo" />
                    <h3 className="logo-title">MOMENTUUM</h3>
                    <h1>Welcome</h1>
                    <h3>Don't have an account?</h3>
                    <button className="white-button">Register</button>
                </div>
            </div>
            <div className="right-column">
                <form onSubmit={handleSubmit} aria-labelledby="login-heading" noValidate className="right-content">
                    <h2 id="login-heading">Login to Account</h2>

                    {error && (
                        <div role="alert" style={{ color: "var(--danger, #b00020)" }}>
                            {error}
                        </div>
                    )}

                    <div>
                        <input
                            placeholder="Email"
                            ref={emailRef}
                            id="email"
                            name="email"
                            type="email"
                            autoComplete="username"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            aria-invalid={!!error && error.toLowerCase().includes("email")}
                            required
                        />
                    </div>


                    <div>
                        <div style={{ display: "flex", alignItems: "center" }}>
                            <input
                                placeholder="Password"
                                id="password"
                                name="password"
                                type={showPassword ? "text" : "password"}
                                autoComplete="current-password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                aria-invalid={!!error && error.toLowerCase().includes("password")}
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <button type="submit" disabled={loading} className="primary-button">
                            Login
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

Login.propTypes = {
    onLoginSuccess: PropTypes.func,
};