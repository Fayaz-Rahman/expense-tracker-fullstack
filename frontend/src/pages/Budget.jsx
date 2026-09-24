import { useEffect, useState } from "react";

import {
    getBudget,
    saveBudget
} from "../services/budgetApi";

import useAuth from "../context/useAuth";

function Budget() {

    const { token } = useAuth();

    const [budget, setBudget] = useState(null);
    const [amount, setAmount] = useState("");

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");


    useEffect(() => {

        async function loadBudget() {

            try {

                setLoading(true);
                setError("");

                const data = await getBudget(token);

                setBudget(data);

                if (data) {
                    setAmount(data.amount);
                }

            } catch (error) {

                setError(
                    error.message ||
                    "Unable to load budget."
                );

            } finally {

                setLoading(false);
            }
        }

        loadBudget();

    }, [token]);


    async function handleSubmit(event) {

        event.preventDefault();

        setError("");
        setSuccess("");

        if (!amount || Number(amount) <= 0) {

            setError(
                "Budget amount must be greater than 0."
            );

            return;
        }

        try {

            setSaving(true);

            const data = await saveBudget(
                token,
                Number(amount)
            );

            setBudget(data);

            setAmount(data.amount);

            setSuccess(
                "Budget saved successfully."
            );

        } catch (error) {

            setError(
                error.message ||
                "Unable to save budget."
            );

        } finally {

            setSaving(false);
        }
    }


    function formatAmount(value) {

        return new Intl.NumberFormat(
            "en-IN",
            {
                style: "currency",
                currency: "INR",
                maximumFractionDigits: 2
            }
        ).format(value);
    }


    if (loading) {

        return (
            <section className="budget-page">

                <div className="page-heading">

                    <p className="page-eyebrow">
                        FINANCIAL SETTINGS
                    </p>

                    <h1>
                        Budget
                    </h1>

                    <p>
                        Loading your budget...
                    </p>

                </div>

            </section>
        );
    }


    return (
        <section className="budget-page">

            <div className="page-heading">

                <p className="page-eyebrow">
                    FINANCIAL SETTINGS
                </p>

                <h1>
                    Budget
                </h1>

                <p>
                    Set and manage the spending limit for your account.
                </p>

            </div>


            <div className="budget-layout">


                {/* CURRENT BUDGET */}

                <article className="budget-summary-card">

                    <p className="section-eyebrow">
                        CURRENT BUDGET
                    </p>

                    {budget ? (

                        <>
                            <h2 className="budget-summary-value">
                                {formatAmount(
                                    Number(budget.amount)
                                )}
                            </h2>

                            <p className="budget-summary-description">
                                Your configured spending budget.
                            </p>
                        </>

                    ) : (

                        <>
                            <h2 className="budget-summary-value budget-not-set">
                                Not Set
                            </h2>

                            <p className="budget-summary-description">
                                Set a budget to track your remaining amount.
                            </p>
                        </>

                    )}

                </article>


                {/* BUDGET FORM */}

                <article className="budget-form-card">

                    <div className="section-heading">

                        <div>

                            <p className="section-eyebrow">
                                {budget
                                    ? "UPDATE BUDGET"
                                    : "SET BUDGET"}
                            </p>

                            <h2>
                                {budget
                                    ? "Edit Budget"
                                    : "Set Your Budget"}
                            </h2>

                            <p>
                                Enter the maximum amount you want to track.
                            </p>

                        </div>

                    </div>


                    <form
                        className="budget-form"
                        onSubmit={handleSubmit}
                    >

                        <div className="form-group">

                            <label htmlFor="budget-amount">
                                Budget Amount
                            </label>

                            <div className="currency-input">

                                <span>
                                    ₹
                                </span>

                                <input
                                    id="budget-amount"
                                    type="number"
                                    value={amount}
                                    onChange={event =>
                                        setAmount(event.target.value)
                                    }
                                    placeholder="0.00"
                                    min="0.01"
                                    step="0.01"
                                    required
                                />

                            </div>

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
                                disabled={saving}
                            >
                                {saving
                                    ? "Saving..."
                                    : budget
                                        ? "Update Budget"
                                        : "Save Budget"}
                            </button>

                        </div>

                    </form>

                </article>

            </div>

        </section>
    );
}

export default Budget;