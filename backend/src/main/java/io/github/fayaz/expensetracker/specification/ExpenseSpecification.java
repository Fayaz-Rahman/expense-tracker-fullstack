package io.github.fayaz.expensetracker.specification;

import io.github.fayaz.expensetracker.model.Expense;
import org.springframework.data.jpa.domain.Specification;

import java.math.BigDecimal;

public class ExpenseSpecification {


    // =========================================================
    // CATEGORY FILTER
    // =========================================================

    public static Specification<Expense> hasCategory(
            String category
    ) {

        return (root, query, criteriaBuilder) ->
                criteriaBuilder.equal(
                        root.get("category"),
                        category
                );
    }


    // =========================================================
    // MINIMUM AMOUNT FILTER
    // =========================================================

    public static Specification<Expense> amountGreaterThanOrEqual(
            BigDecimal minAmount
    ) {

        return (root, query, criteriaBuilder) ->
                criteriaBuilder.greaterThanOrEqualTo(
                        root.get("amount"),
                        minAmount
                );
    }


    // =========================================================
    // MAXIMUM AMOUNT FILTER
    // =========================================================

    public static Specification<Expense> amountLessThanOrEqual(
            BigDecimal maxAmount
    ) {

        return (root, query, criteriaBuilder) ->
                criteriaBuilder.lessThanOrEqualTo(
                        root.get("amount"),
                        maxAmount
                );
    }


    // =========================================================
    // COMBINE OPTIONAL FILTERS
    // =========================================================

    public static Specification<Expense> filterExpenses(
            String category,
            BigDecimal minAmount,
            BigDecimal maxAmount
    ) {

        Specification<Expense> specification =
                Specification.where(null);


        // Category filter
        if (category != null && !category.isBlank()) {

            specification = specification.and(
                    hasCategory(category)
            );
        }


        // Minimum amount filter
        if (minAmount != null) {

            specification = specification.and(
                    amountGreaterThanOrEqual(minAmount)
            );
        }


        // Maximum amount filter
        if (maxAmount != null) {

            specification = specification.and(
                    amountLessThanOrEqual(maxAmount)
            );
        }


        return specification;
    }
}