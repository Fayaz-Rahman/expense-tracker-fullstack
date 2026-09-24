package io.github.fayaz.expensetracker.dto;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

import java.math.BigDecimal;

public class BudgetRequest {

    @NotNull(message = "Budget amount is required")
    @Positive(message = "Budget amount must be greater than 0")
    private BigDecimal amount;

    public BudgetRequest() {
    }

    public BigDecimal getAmount() {
        return amount;
    }

    public void setAmount(BigDecimal amount) {
        this.amount = amount;
    }
}