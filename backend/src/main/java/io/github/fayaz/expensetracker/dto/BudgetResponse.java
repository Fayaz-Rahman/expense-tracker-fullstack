package io.github.fayaz.expensetracker.dto;

import java.math.BigDecimal;

public class BudgetResponse {

    private Integer id;
    private BigDecimal amount;

    public BudgetResponse() {
    }

    public BudgetResponse(
            Integer id,
            BigDecimal amount
    ) {
        this.id = id;
        this.amount = amount;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public BigDecimal getAmount() {
        return amount;
    }

    public void setAmount(BigDecimal amount) {
        this.amount = amount;
    }
}