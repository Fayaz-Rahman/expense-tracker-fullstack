package io.github.fayaz.expensetracker.dto;

import java.math.BigDecimal;
import java.util.Map;

public class ExpenseAiData {

    private BigDecimal totalSpent;
    private int expenseCount;
    private Map<String, BigDecimal> categoryBreakdown;

    public ExpenseAiData() {
    }

    public ExpenseAiData(
            BigDecimal totalSpent,
            int expenseCount,
            Map<String, BigDecimal> categoryBreakdown
    ) {
        this.totalSpent = totalSpent;
        this.expenseCount = expenseCount;
        this.categoryBreakdown = categoryBreakdown;
    }

    public BigDecimal getTotalSpent() {
        return totalSpent;
    }

    public void setTotalSpent(BigDecimal totalSpent) {
        this.totalSpent = totalSpent;
    }

    public int getExpenseCount() {
        return expenseCount;
    }

    public void setExpenseCount(int expenseCount) {
        this.expenseCount = expenseCount;
    }

    public Map<String, BigDecimal> getCategoryBreakdown() {
        return categoryBreakdown;
    }

    public void setCategoryBreakdown(
            Map<String, BigDecimal> categoryBreakdown
    ) {
        this.categoryBreakdown = categoryBreakdown;
    }
}