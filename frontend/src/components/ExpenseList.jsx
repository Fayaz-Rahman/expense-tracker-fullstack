import { useEffect, useState } from "react";

import {
    getExpenses,
    deleteExpense
} from "../services/expenseApi";

import EditExpense from "./EditExpense";
import useAuth from "../context/useAuth";

function ExpenseList({
    refreshTrigger,
    onExpenseDeleted,
    onExpenseUpdated
}) {

    const { token } = useAuth();

    const [expenses, setExpenses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [editingExpense, setEditingExpense] =
        useState(null);

    useEffect(() => {

        async function loadExpenses() {

            try {

                setLoading(true);
                setError("");

                const data = await getExpenses(token);

                setExpenses(data);

            } catch (error) {

                setError(error.message);

            } finally {

                setLoading(false);
            }
        }

        loadExpenses();

    }, [refreshTrigger, token]);


    async function handleDelete(id) {

        const confirmed = window.confirm(
            "Are you sure you want to delete this expense?"
        );

        if (!confirmed) {
            return;
        }

        try {

            await deleteExpense(token, id);

            onExpenseDeleted();

        } catch (error) {

            setError(error.message);
        }
    }


    if (loading) {

        return (
            <section className="expense-list-card">

                <div className="loading-state">
                    Loading expenses...
                </div>

            </section>
        );
    }


    return (
        <section className="expense-list-card">

            <div className="section-heading">

                <div>

                    <p className="section-eyebrow">
                        TRANSACTIONS
                    </p>

                    <h2>
                        Expenses
                    </h2>

                    <p>
                        Review and manage your recorded expenses.
                    </p>

                </div>

                <span className="expense-count">
                    {expenses.length}
                    {" "}
                    {expenses.length === 1
                        ? "expense"
                        : "expenses"}
                </span>

            </div>


            {error && (
                <div className="form-message error">
                    {error}
                </div>
            )}


            {expenses.length > 0 ? (

                <div className="expense-list">

                    {expenses.map(expense => (

                        <article
                            className="expense-item"
                            key={expense.id}
                        >

                            <div className="expense-item-main">

                                <div className="expense-category-marker">
                                    {expense.category
                                        ? expense.category
                                            .charAt(0)
                                            .toUpperCase()
                                        : "E"}
                                </div>


                                <div className="expense-item-details">

                                    <h3>
                                        {expense.title}
                                    </h3>

                                    <div className="expense-item-meta">

                                    {expense.category && (
                                        <span>
                                            {expense.category}
                                        </span>
                                    )}

                                    {expense.category && expense.expenseDate && (
                                        <span className="meta-separator">
                                            •
                                        </span>
                                    )}

                                    {expense.expenseDate && (
                                        <span>
                                            {expense.expenseDate}
                                        </span>
                                    )}

                                    {!expense.category && !expense.expenseDate && (
                                        <span>
                                            No category or date
                                        </span>
                                    )}

                                </div>

                                </div>

                            </div>


                            <div className="expense-item-actions">

                                <div className="expense-amount">
                                    ₹{Number(expense.amount).toFixed(2)}
                                </div>


                                <div className="expense-buttons">

                                    <button
                                        className="secondary-button"
                                        type="button"
                                        onClick={() =>
                                            setEditingExpense(expense)
                                        }
                                    >
                                        Edit
                                    </button>

                                    <button
                                        className="danger-button"
                                        type="button"
                                        onClick={() =>
                                            handleDelete(expense.id)
                                        }
                                    >
                                        Delete
                                    </button>

                                </div>

                            </div>


                            {editingExpense?.id === expense.id && (

                                <div className="edit-expense-wrapper">

                                    <EditExpense
                                        expense={expense}

                                        onExpenseUpdated={() => {
                                            setEditingExpense(null);
                                            onExpenseUpdated();
                                        }}

                                        onCancel={() => {
                                            setEditingExpense(null);
                                        }}
                                    />

                                </div>

                            )}

                        </article>

                    ))}

                </div>

            ) : (

                <div className="empty-state">

                    <h3>
                        No expenses yet
                    </h3>

                    <p>
                        Add your first expense using the form
                        to start tracking your spending.
                    </p>

                </div>

            )}

        </section>
    );
}

export default ExpenseList;