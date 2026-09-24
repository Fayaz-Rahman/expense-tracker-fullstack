import { Routes, Route, Navigate } from "react-router-dom";

import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Budget from "./pages/Budget";
import Categories from "./pages/Categories";

import Login from "./components/Login";
import Register from "./components/Register";
import ExpensesPage from "./components/ExpensesPage";

import ProtectedRoute from "./components/ProtectedRoute";
import AppLayout from "./layouts/AppLayout";
import PublicLayout from "./layouts/PublicLayout";


function App() {

    return (
        <Routes>

            {/* ========================= */}
            {/* PUBLIC HOME                */}
            {/* ========================= */}

            <Route
                path="/"
                element={<Home />}
            />


            {/* ========================= */}
            {/* PUBLIC AUTHENTICATION      */}
            {/* ========================= */}

            <Route element={<PublicLayout />}>

                <Route
                    path="/login"
                    element={<Login />}
                />

                <Route
                    path="/register"
                    element={<Register />}
                />

            </Route>


            {/* ========================= */}
            {/* PROTECTED APPLICATION      */}
            {/* ========================= */}

            <Route
                element={
                    <ProtectedRoute>
                        <AppLayout />
                    </ProtectedRoute>
                }
            >

                <Route
                    path="/dashboard"
                    element={<Dashboard />}
                />

                <Route
                    path="/expenses"
                    element={<ExpensesPage />}
                />

                <Route
                    path="/budget"
                    element={<Budget />}
                />

                <Route
                    path="/categories"
                    element={<Categories />}
                />

            </Route>


            {/* ========================= */}
            {/* UNKNOWN URL                */}
            {/* ========================= */}

            <Route
                path="*"
                element={<Navigate to="/" replace />}
            />

        </Routes>
    );
}

export default App;