import { useState } from "react";

import { updateExpense } from "../services/expenseApi";
import useAuth from "../context/useAuth";

function EditExpense({
    expense,
    onExpenseUpdated,
    onCancel
}) {

    const { token } = useAuth();

    const [title, setTitle] =
        useState(expense.title);

    const [amount, setAmount] =
        useState(expense.amount);

    const [category, setCategory] =
        useState(expense.category);

    const [expenseDate, setExpenseDate] =
        useState(expense.expenseDate);

    const [error, setError] = useState("");


    async function handleSubmit(event) {

        event.preventDefault();

        setError("");

        try {

            const updatedExpense = {
                title: title,
                amount: Number(amount),
                category: category,
                expenseDate: expenseDate
            };

            await updateExpense(
                token,
                expense.id,
                updatedExpense
            );

            onExpenseUpdated();

        } catch (error) {

            setError(error.message);
        }
    }


    return (
        <div className="edit-expense-panel">

            <div className="edit-expense-heading">

                <div>

                    <p className="section-eyebrow">
                        EDIT TRANSACTION
                    </p>

                    <h3>
                        Update Expense
                    </h3>

                </div>

            </div>


            <form
                className="expense-form"
                onSubmit={handleSubmit}
            >

                <div className="form-group">

                    <label htmlFor={`edit-title-${expense.id}`}>
                        Title
                    </label>

                    <input
                        id={`edit-title-${expense.id}`}
                        type="text"
                        value={title}
                        onChange={event =>
                            setTitle(event.target.value)
                        }
                        required
                    />

                </div>


                <div className="expense-form-row">

                    <div className="form-group">

                        <label htmlFor={`edit-amount-${expense.id}`}>
                            Amount
                        </label>

                        <div className="currency-input">

                            <span>
                                ₹
                            </span>

                            <input
                                id={`edit-amount-${expense.id}`}
                                type="number"
                                value={amount}
                                onChange={event =>
                                    setAmount(event.target.value)
                                }
                                min="0.01"
                                step="0.01"
                                required
                            />

                        </div>

                    </div>


                    <div className="form-group">

                        <label htmlFor={`edit-category-${expense.id}`}>
                            Category
                        </label>

                        <input
                            id={`edit-category-${expense.id}`}
                            type="text"
                            value={category}
                            onChange={event =>
                                setCategory(event.target.value)
                            }
                            required
                        />

                    </div>

                </div>


                <div className="form-group">

                    <label htmlFor={`edit-date-${expense.id}`}>
                        Date
                    </label>

                    <input
                        id={`edit-date-${expense.id}`}
                        type="date"
                        value={expenseDate}
                        onChange={event =>
                            setExpenseDate(event.target.value)
                        }
                        required
                    />

                </div>


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
                        Save Changes
                    </button>

                    <button
                        className="secondary-button"
                        type="button"
                        onClick={onCancel}
                    >
                        Cancel
                    </button>

                </div>

            </form>

        </div>
    );
}

export default EditExpense;