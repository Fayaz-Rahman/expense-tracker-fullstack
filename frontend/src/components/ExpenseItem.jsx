function ExpenseItem({ expense }) {

    return (
        <div>
            <h3>{expense.title}</h3>

            <p>Amount: ₹{expense.amount}</p>

            <p>Category: {expense.category}</p>
        </div>
    );
}

export default ExpenseItem;