import { useState } from "react";

import AiInsights from "./AiInsights";
import ExpenseForm from "./ExpenseForm";
import ExpenseList from "./ExpenseList";

function ExpensesPage() {

    const [refreshTrigger, setRefreshTrigger] =
        useState(0);


    function handleExpensesChanged() {

        setRefreshTrigger(
            previousValue => previousValue + 1
        );
    }


    return (
        <section className="expenses-page">

            <div className="page-heading">

                <p className="page-eyebrow">
                    EXPENSE MANAGEMENT
                </p>

                <h1>
                    Expenses
                </h1>

                <p>
                    Record, review and manage your personal expenses.
                </p>

            </div>


            <div className="expenses-layout">

                <ExpenseForm
                    onExpenseAdded={handleExpensesChanged}
                />


                <ExpenseList
                    refreshTrigger={refreshTrigger}
                    onExpenseDeleted={handleExpensesChanged}
                    onExpenseUpdated={handleExpensesChanged}
                />

            </div>


            <AiInsights />

        </section>
    );
}

export default ExpensesPage;