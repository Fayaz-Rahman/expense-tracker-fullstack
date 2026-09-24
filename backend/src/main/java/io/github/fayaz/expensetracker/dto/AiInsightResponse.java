package io.github.fayaz.expensetracker.dto;

import java.math.BigDecimal;
import java.util.List;

public class AiInsightResponse {

    private String highestCategory;

    private BigDecimal highestCategoryAmount;

    private String summary;

    private List<String> suggestions;

    public AiInsightResponse() {
    }

    public AiInsightResponse(
            String highestCategory,
            BigDecimal highestCategoryAmount,
            String summary,
            List<String> suggestions
    ) {
        this.highestCategory = highestCategory;
        this.highestCategoryAmount = highestCategoryAmount;
        this.summary = summary;
        this.suggestions = suggestions;
    }

    public String getHighestCategory() {
        return highestCategory;
    }

    public void setHighestCategory(String highestCategory) {
        this.highestCategory = highestCategory;
    }

    public BigDecimal getHighestCategoryAmount() {
        return highestCategoryAmount;
    }

    public void setHighestCategoryAmount(
            BigDecimal highestCategoryAmount
    ) {
        this.highestCategoryAmount = highestCategoryAmount;
    }

    public String getSummary() {
        return summary;
    }

    public void setSummary(String summary) {
        this.summary = summary;
    }

    public List<String> getSuggestions() {
        return suggestions;
    }

    public void setSuggestions(List<String> suggestions) {
        this.suggestions = suggestions;
    }
}