package io.github.fayaz.expensetracker.exception;

public class ExpenseNotFoundException extends RuntimeException {

    public ExpenseNotFoundException(String message){
        super(message);

    }

}
