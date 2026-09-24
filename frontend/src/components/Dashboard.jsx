import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { getExpenses } from "../services/expenseApi";
import { getBudget } from "../services/budgetApi";

import useAuth from "../context/useAuth";

function Dashboard() {

    const { token } = useAuth();

    const [expenses, setExpenses] = useState([]);
    const [budget, setBudget] = useState(null);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");


    useEffect(() => {

        async function loadDashboard() {

            try {

                setLoading(true);
                setError("");

                const [
                    expenseData,
                    budgetData
                ] = await Promise.all([
                    getExpenses(token),
                    getBudget(token)
                ]);

                setExpenses(
                    Array.isArray(expenseData)
                        ? expenseData
                        : []
                );

                setBudget(budgetData);

            } catch (error) {

                console.error(
                    "Failed to load dashboard:",
                    error
                );

                setError(
                    "Unable to load dashboard data."
                );

            } finally {

                setLoading(false);
            }
        }

        loadDashboard();

    }, [token]);


    const totalSpent = expenses.reduce(
        (total, expense) =>
            total + Number(expense.amount || 0),
        0
    );


    const budgetAmount = budget
        ? Number(budget.amount)
        : null;


    const remainingAmount = budget
        ? budgetAmount - totalSpent
        : null;


    const budgetUsedPercentage = budget
        ? (totalSpent / budgetAmount) * 100
        : null;


    const recentExpenses = [...expenses]
        .sort(
            (a, b) =>
                new Date(b.expenseDate) -
                new Date(a.expenseDate)
        )
        .slice(0, 5);


    function formatAmount(amount) {

        return new Intl.NumberFormat(
            "en-IN",
            {
                style: "currency",
                currency: "INR",
                maximumFractionDigits: 2
            }
        ).format(amount);
    }


    if (loading) {

        return (
            <section className="dashboard-page">

                <div className="page-heading">

                    <p className="page-eyebrow">
                        OVERVIEW
                    </p>

                    <h1>
                        Dashboard
                    </h1>

                    <p>
                        Loading your spending information...
                    </p>

                </div>

            </section>
        );
    }


    return (
        <section className="dashboard-page">


            {/* PAGE HEADER */}

            <div className="page-heading">

                <p className="page-eyebrow">
                    OVERVIEW
                </p>

                <h1>
                    Dashboard
                </h1>

                <p>
                    Keep track of your spending and
                    understand where your money goes.
                </p>

            </div>


            {/* ERROR */}

            {error && (
                <div className="dashboard-error">
                    {error}
                </div>
            )}


            {/* SUMMARY CARDS */}

            <div className="summary-grid">

                <article className="summary-card">

                    <p className="summary-label">
                        Total Spent
                    </p>

                    <h2 className="summary-value">
                        {formatAmount(totalSpent)}
                    </h2>

                    <p className="summary-description">
                        Based on your recorded expenses
                    </p>

                </article>


                <article className="summary-card">

                    <p className="summary-label">
                        Expenses
                    </p>

                    <h2 className="summary-value">
                        {expenses.length}
                    </h2>

                    <p className="summary-description">
                        Total recorded transactions
                    </p>

                </article>


                <article className="summary-card">

                    <p className="summary-label">
                        Budget
                    </p>

                    <h2 className="summary-value">

                        {budget
                            ? formatAmount(budgetAmount)
                            : "Not Set"}

                    </h2>

                    <p className="summary-description">
                        {budget
                            ? "Your configured budget"
                            : "Set a budget to track spending"}
                    </p>

                </article>


                <article
                    className={
                        `summary-card ${
                            budget &&
                            remainingAmount < 0
                                ? "summary-card-over-budget"
                                : ""
                        }`
                    }
                >

                    <p className="summary-label">
                        Remaining
                    </p>

                    <h2 className="summary-value">

                        {budget
                            ? formatAmount(remainingAmount)
                            : "—"}

                    </h2>

                    <p className="summary-description">

                        {budget
                            ? remainingAmount < 0
                                ? "Budget exceeded"
                                : "Available from your budget"
                            : "Set a budget first"}

                    </p>

                </article>

            </div>


            {/* BUDGET PROGRESS */}

            {budget && (

                <article className="budget-progress-card">

                    <div className="budget-progress-header">

                        <div>

                            <p className="dashboard-card-label">
                                BUDGET USAGE
                            </p>

                            <h2>
                                {Math.round(
                                    budgetUsedPercentage
                                )}% used
                            </h2>

                        </div>

                        <Link
                            to="/budget"
                            className="text-link"
                        >
                            Edit budget
                        </Link>

                    </div>


                    <div className="budget-progress-track">

                        <div
                            className={
                                `budget-progress-fill ${
                                    budgetUsedPercentage > 100
                                        ? "over-budget"
                                        : ""
                                }`
                            }
                            style={{
                                width: `${Math.min(
                                    budgetUsedPercentage,
                                    100
                                )}%`
                            }}
                        />

                    </div>


                    <div className="budget-progress-details">

                        <span>
                            Spent {formatAmount(totalSpent)}
                        </span>

                        <span>
                            Budget {formatAmount(budgetAmount)}
                        </span>

                    </div>

                </article>

            )}


            {/* MAIN DASHBOARD GRID */}

            <div className="dashboard-grid">


                {/* SPENDING OVERVIEW */}

                <article className="dashboard-card spending-overview">

                    <div className="dashboard-card-header">

                        <div>

                            <p className="dashboard-card-label">
                                ANALYTICS
                            </p>

                            <h2>
                                Spending Overview
                            </h2>

                        </div>

                        <span className="dashboard-coming-soon">
                            Charts next
                        </span>

                    </div>


                    <div className="chart-placeholder">

                        <div className="chart-placeholder-content">

                            <h3>
                                Spending analytics
                            </h3>

                            <p>
                                This area will show your spending
                                trends and category breakdown.
                            </p>

                            <span>
                                Analytics module coming next
                            </span>

                        </div>

                    </div>

                </article>


                {/* QUICK ACTIONS */}

                <article className="dashboard-card">

                    <div className="dashboard-card-header">

                        <div>

                            <p className="dashboard-card-label">
                                ACTIONS
                            </p>

                            <h2>
                                Quick Actions
                            </h2>

                        </div>

                    </div>


                    <div className="quick-actions">

                        <Link
                            to="/expenses"
                            className="quick-action primary"
                        >
                            <span>
                                Add Expense
                            </span>

                            <span className="quick-action-arrow">
                                →
                            </span>
                        </Link>


                        <Link
                            to="/budget"
                            className="quick-action"
                        >
                            <span>
                                Set or edit budget
                            </span>

                            <span className="quick-action-arrow">
                                →
                            </span>
                        </Link>

                         <Link
                            to="/categories"
                            className="quick-action"
                        >
                            <span>
                                Manage categories
                            </span>

                            <span className="quick-action-arrow">
                                →
                            </span>
                        </Link>

                    </div>

                </article>

            </div>


            {/* RECENT EXPENSES */}

            <article className="dashboard-card recent-expenses-card">

                <div className="dashboard-card-header">

                    <div>

                        <p className="dashboard-card-label">
                            ACTIVITY
                        </p>

                        <h2>
                            Recent Expenses
                        </h2>

                    </div>

                    <Link
                        to="/expenses"
                        className="text-link"
                    >
                        View all
                    </Link>

                </div>


                {recentExpenses.length === 0 ? (

                    <div className="empty-state">

                        <h3>
                            No expenses yet
                        </h3>

                        <p>
                            Add your first expense to start
                            tracking your spending.
                        </p>

                        <Link
                            to="/expenses"
                            className="dashboard-primary-button"
                        >
                            Add Expense
                        </Link>

                    </div>

                ) : (

                    <div className="recent-expense-list">

                        {recentExpenses.map(
                            (expense) => (

                                <div
                                    className="recent-expense-row"
                                    key={expense.id}
                                >

                                    <div>

                                        <p className="recent-expense-title">
                                            {expense.title}
                                        </p>

                                        <p className="recent-expense-meta">
                                            {expense.category}
                                        </p>

                                    </div>


                                    <div className="recent-expense-right">

                                        <p className="recent-expense-amount">
                                            {formatAmount(
                                                Number(
                                                    expense.amount || 0
                                                )
                                            )}
                                        </p>

                                        <p className="recent-expense-date">
                                            {expense.expenseDate}
                                        </p>

                                    </div>

                                </div>

                            )
                        )}

                    </div>

                )}

            </article>

        </section>
    );
}

export default Dashboard;