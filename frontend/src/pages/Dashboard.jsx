import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
    ResponsiveContainer,
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    BarChart,
    Bar
} from "recharts";

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


    /*
     * =========================================
     * CATEGORY CHART DATA
     * =========================================
     */

    const categoryTotals = {};

    expenses.forEach(expense => {

        const category =
            expense.category || "Uncategorized";

        const amount =
            Number(expense.amount || 0);

        categoryTotals[category] =
            (categoryTotals[category] || 0) + amount;
    });


    const categoryChartData =
        Object.entries(categoryTotals)
            .map(([category, amount]) => ({
                category,
                amount
            }))
            .sort(
                (a, b) =>
                    b.amount - a.amount
            );


    /*
     * =========================================
     * SPENDING TREND DATA
     * =========================================
     */

    const spendingByDate = {};

    expenses.forEach(expense => {

        const date =
            expense.expenseDate;

        const amount =
            Number(expense.amount || 0);

        spendingByDate[date] =
            (spendingByDate[date] || 0) + amount;
    });


    const spendingChartData =
        Object.entries(spendingByDate)
            .map(([date, amount]) => ({
                date,
                amount
            }))
            .sort(
                (a, b) =>
                    new Date(a.date) -
                    new Date(b.date)
            );


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


    function formatChartAmount(value) {

        return `₹${Number(value).toLocaleString("en-IN")}`;
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


            {/* ========================= */}
            {/* PAGE HEADER                */}
            {/* ========================= */}

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


            {/* ========================= */}
            {/* ERROR                      */}
            {/* ========================= */}

            {error && (
                <div className="dashboard-error">
                    {error}
                </div>
            )}


            {/* ========================= */}
            {/* SUMMARY CARDS              */}
            {/* ========================= */}

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


            {/* ========================= */}
            {/* BUDGET PROGRESS            */}
            {/* ========================= */}

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
                                    Math.max(
                                        budgetUsedPercentage,
                                        0
                                    ),
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


            {/* ========================= */}
            {/* ANALYTICS                  */}
            {/* ========================= */}

            <div className="analytics-grid">


                {/* SPENDING TREND */}

                <article className="dashboard-card analytics-card">

                    <div className="dashboard-card-header">

                        <div>

                            <p className="dashboard-card-label">
                                SPENDING TREND
                            </p>

                            <h2>
                                Spending Overview
                            </h2>

                        </div>

                    </div>


                    {spendingChartData.length > 0 ? (

                        <div className="chart-container">

                            <ResponsiveContainer
                                width="100%"
                                height={300}
                            >

                                <LineChart
                                    data={spendingChartData}
                                    margin={{
                                        top: 10,
                                        right: 10,
                                        left: 10,
                                        bottom: 10
                                    }}
                                >

                                    <CartesianGrid
                                        stroke="#E5E7EB"
                                        strokeDasharray="3 3"
                                    />

                                    <XAxis
                                        dataKey="date"
                                        tick={{
                                            fontSize: 12
                                        }}
                                    />

                                    <YAxis
                                        tick={{
                                            fontSize: 12
                                        }}
                                        tickFormatter={
                                            formatChartAmount
                                        }
                                    />

                                    <Tooltip
                                        formatter={(value) =>
                                            formatAmount(
                                                Number(value)
                                            )
                                        }
                                    />

                                    <Line
                                        type="monotone"
                                        dataKey="amount"
                                        stroke="#2563EB"
                                        strokeWidth={2.5}
                                        dot={{
                                            r: 3
                                        }}
                                        activeDot={{
                                            r: 5
                                        }}
                                    />

                                </LineChart>

                            </ResponsiveContainer>

                        </div>

                    ) : (

                        <div className="chart-empty-state">

                            <h3>
                                No spending data yet
                            </h3>

                            <p>
                                Add expenses to see your
                                spending trend.
                            </p>

                        </div>

                    )}

                </article>


                {/* CATEGORY BREAKDOWN */}

                <article className="dashboard-card analytics-card">

                    <div className="dashboard-card-header">

                        <div>

                            <p className="dashboard-card-label">
                                CATEGORIES
                            </p>

                            <h2>
                                Category Breakdown
                            </h2>

                        </div>

                    </div>


                    {categoryChartData.length > 0 ? (

                        <div className="chart-container">

                            <ResponsiveContainer
                                width="100%"
                                height={300}
                            >

                                <BarChart
                                    data={categoryChartData}
                                    layout="vertical"
                                    margin={{
                                        top: 10,
                                        right: 20,
                                        left: 10,
                                        bottom: 10
                                    }}
                                >

                                    <CartesianGrid
                                        stroke="#E5E7EB"
                                        strokeDasharray="3 3"
                                    />

                                    <XAxis
                                        type="number"
                                        tick={{
                                            fontSize: 12
                                        }}
                                        tickFormatter={
                                            formatChartAmount
                                        }
                                    />

                                    <YAxis
                                        type="category"
                                        dataKey="category"
                                        width={85}
                                        tick={{
                                            fontSize: 12
                                        }}
                                    />

                                    <Tooltip
                                        formatter={(value) =>
                                            formatAmount(
                                                Number(value)
                                            )
                                        }
                                    />

                                    <Bar
                                        dataKey="amount"
                                        fill="#6D5BD0"
                                        radius={[0, 4, 4, 0]}
                                    />

                                </BarChart>

                            </ResponsiveContainer>

                        </div>

                    ) : (

                        <div className="chart-empty-state">

                            <h3>
                                No categories yet
                            </h3>

                            <p>
                                Add expenses with categories
                                to see the breakdown.
                            </p>

                        </div>

                    )}

                </article>

            </div>


            {/* ========================= */}
            {/* QUICK ACTIONS              */}
            {/* ========================= */}

            <article className="dashboard-card quick-actions-card">

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

                </div>

            </article>


            {/* ========================= */}
            {/* RECENT EXPENSES            */}
            {/* ========================= */}

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