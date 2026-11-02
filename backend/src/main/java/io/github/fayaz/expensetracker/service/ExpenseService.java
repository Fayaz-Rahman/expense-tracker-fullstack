package io.github.fayaz.expensetracker.service;

import io.github.fayaz.expensetracker.exception.ExpenseNotFoundException;
import io.github.fayaz.expensetracker.exception.UserNotFoundException;
import io.github.fayaz.expensetracker.model.Expense;
import io.github.fayaz.expensetracker.model.User;
import io.github.fayaz.expensetracker.repository.ExpenseRepository;
import io.github.fayaz.expensetracker.repository.UserRepository;
import io.github.fayaz.expensetracker.specification.ExpenseSpecification;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import io.github.fayaz.expensetracker.model.Category;
import io.github.fayaz.expensetracker.repository.CategoryRepository;

import java.math.BigDecimal;
import java.util.List;

@Service
public class ExpenseService {

    private final ExpenseRepository expenseRepository;
    private final UserRepository userRepository;
    private final CategoryRepository categoryRepository;
    public ExpenseService(
            ExpenseRepository expenseRepository,
            UserRepository userRepository,
            CategoryRepository categoryRepository
    ) {
        this.expenseRepository = expenseRepository;
        this.userRepository = userRepository;
        this.categoryRepository = categoryRepository;
    }


    // =========================================================
    // GET EXPENSES FOR LOGGED-IN USER
    // =========================================================

    public List<Expense> findExpenses(
            String email,
            String category,
            BigDecimal minAmount,
            BigDecimal maxAmount
    ) {

        // Step 1: Find logged-in user
        User user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new UserNotFoundException("User not found")
                );


        // Step 2: Create specification for optional filters
        Specification<Expense> specification =
                ExpenseSpecification.filterExpenses(
                        category,
                        minAmount,
                        maxAmount
                );


        // Step 3: Add ownership condition
        specification = specification.and(
                (root, query, criteriaBuilder) ->
                        criteriaBuilder.equal(
                                root.get("user"),
                                user
                        )
        );


        // Step 4: Query database
        return expenseRepository.findAll(specification);
    }


    // =========================================================
    // GET EXPENSE BY ID
    // =========================================================

    public Expense findById(
            Integer id,
            String email
    ) {

        Expense expense = expenseRepository.findById(id)
                .orElseThrow(() ->
                        new ExpenseNotFoundException(
                                "Expense not found"
                        )
                );


        // Check ownership
        if (expense.getUser() == null ||
                !expense.getUser().getEmail().equals(email)) {

            throw new ExpenseNotFoundException(
                    "Expense not found"
            );
        }


        return expense;
    }


    // =========================================================
    // ADD EXPENSE
    // =========================================================

    public Expense addExpense(
            String email,
            Expense expense
    ) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new UserNotFoundException("User not found")
                );

        expense.setUser(user);

        String categoryName = expense.getCategory();

        if (categoryName != null && !categoryName.isBlank()) {

            categoryName = categoryName.trim();

            if (categoryName.length() > 100) {
                throw new IllegalArgumentException(
                        "Category name must not exceed 100 characters"
                );
            }

            if (!categoryRepository.existsByUserEmailAndNameIgnoreCase(
                    email,
                    categoryName
            )) {

                Category category = new Category();
                category.setName(categoryName);
                category.setUser(user);

                categoryRepository.save(category);
            }

            expense.setCategory(categoryName);

        } else {
            expense.setCategory(null);
        }

        return expenseRepository.save(expense);
    }


    // =========================================================
    // UPDATE EXPENSE
    // =========================================================

    public Expense updateExpense(
            Integer id,
            String email,
            Expense updatedExpense
    ) {

        // Find expense
        Expense expense = expenseRepository.findById(id)
                .orElseThrow(() ->
                        new ExpenseNotFoundException(
                                "Expense not found"
                        )
                );


        // Check ownership
        if (expense.getUser() == null ||
                !expense.getUser().getEmail().equals(email)) {

            throw new ExpenseNotFoundException(
                    "Expense not found"
            );
        }


        // Update allowed fields
        expense.setTitle(updatedExpense.getTitle());
        expense.setAmount(updatedExpense.getAmount());
        expense.setCategory(updatedExpense.getCategory());
        expense.setExpenseDate(updatedExpense.getExpenseDate());


        return expenseRepository.save(expense);
    }


    // =========================================================
    // DELETE EXPENSE
    // =========================================================

    public void deleteExpense(
            Integer id,
            String email
    ) {

        // Find expense
        Expense expense = expenseRepository.findById(id)
                .orElseThrow(() ->
                        new ExpenseNotFoundException(
                                "Expense not found"
                        )
                );


        // Check ownership
        if (expense.getUser() == null ||
                !expense.getUser().getEmail().equals(email)) {

            throw new ExpenseNotFoundException(
                    "Expense not found"
            );
        }


        expenseRepository.delete(expense);
    }
}