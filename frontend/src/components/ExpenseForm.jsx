import { useEffect, useState } from "react";

import { createExpense } from "../services/expenseApi";
import { getCategories } from "../services/categoryApi";

import useAuth from "../context/useAuth";

function ExpenseForm({ onExpenseAdded }) {

    const { token } = useAuth();

    const [title, setTitle] = useState("");
    const [amount, setAmount] = useState("");
    const [category, setCategory] = useState("");
    const [expenseDate, setExpenseDate] = useState("");

    const [categories, setCategories] = useState([]);

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    useEffect(() => {

        async function loadCategories() {

            try {

                const data =
                    await getCategories(token);

                setCategories(
                    Array.isArray(data)
                        ? data
                        : []
                );

            } catch (error) {

                console.error(
                    "Failed to load categories:",
                    error
                );
            }
        }

        loadCategories();

    }, [token]);


    async function handleSubmit(event) {

        event.preventDefault();

        setError("");
        setSuccess("");


        if (!title || !amount) {

            setError(
                "Title and amount are required."
            );

            return;
        }


        try {

            const expense = {
                title: title,
                amount: Number(amount),
                category: category || null,
                expenseDate: expenseDate || null
            };


            await createExpense(
                token,
                expense
            );


            onExpenseAdded();


            setSuccess(
                "Expense added successfully."
            );


            setTitle("");
            setAmount("");
            setCategory("");
            setExpenseDate("");

        } catch (error) {

            setError(error.message);
        }
    }


    return (
        <section className="expense-form-card">

            <div className="section-heading">

                <div>

                    <p className="section-eyebrow">
                        NEW TRANSACTION
                    </p>

                    <h2>
                        Add Expense
                    </h2>

                    <p>
                        Record a new expense to keep your
                        spending up to date.
                    </p>

                </div>

            </div>


            <form
                className="expense-form"
                onSubmit={handleSubmit}
            >

                <div className="form-group">

                    <label htmlFor="expense-title">
                        Title
                    </label>

                    <input
                        id="expense-title"
                        type="text"
                        placeholder="e.g. Lunch"
                        value={title}
                        onChange={event =>
                            setTitle(event.target.value)
                        }
                        required
                    />

                </div>


                <div className="expense-form-row">

                    <div className="form-group">

                        <label htmlFor="expense-amount">
                            Amount
                        </label>

                        <div className="currency-input">

                            <span>
                                ₹
                            </span>

                            <input
                                id="expense-amount"
                                type="number"
                                placeholder="0.00"
                                value={amount}
                                onChange={event =>
                                    setAmount(
                                        event.target.value
                                    )
                                }
                                min="0.01"
                                step="0.01"
                                required
                            />

                        </div>

                    </div>


                    <div className="form-group">

                        <label htmlFor="expense-category">
                            Category
                        </label>

                        <select
                            id="expense-category"
                            value={category}
                            onChange={event =>
                                setCategory(
                                    event.target.value
                                )
                            }
                        >

                            <option value="">
                                No category
                            </option>

                            {categories.map(
                                currentCategory => (

                                    <option
                                        key={currentCategory.id}
                                        value={
                                            currentCategory.name
                                        }
                                    >
                                        {currentCategory.name}
                                    </option>

                                )
                            )}

                        </select>

                    </div>

                </div>


                <div className="form-group">

                    <label htmlFor="expense-date">
                        Date
                    </label>

                    <input
                        id="expense-date"
                        type="date"
                        value={expenseDate}
                        onChange={event =>
                            setExpenseDate(
                                event.target.value
                            )
                        }
                    />

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


                <div className="form-actions">

                    <button
                        className="primary-button"
                        type="submit"
                    >
                        Add Expense
                    </button>

                </div>

            </form>

        </section>
    );
}

export default ExpenseForm;