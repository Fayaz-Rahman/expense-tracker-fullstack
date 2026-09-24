package io.github.fayaz.expensetracker.controller;

import io.github.fayaz.expensetracker.model.Expense;
import io.github.fayaz.expensetracker.service.ExpenseService;
import jakarta.validation.Valid;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;

@RestController
public class ExpenseController {

    private final ExpenseService expenseService;

    public ExpenseController(ExpenseService expenseService) {
        this.expenseService = expenseService;
    }

    // GET expense by ID
    @GetMapping("/api/expenses/{id}")
    public Expense getExpense(
            @PathVariable int id,
            Authentication authentication
    ) {

        String email = authentication.getName();

        return expenseService.findById(id, email);
    }


    // GET all expenses belonging to logged-in user
    // Optional filters: category, minAmount, maxAmount
    @GetMapping("/api/expenses")
    public List<Expense> getExpenses(
            @RequestParam(required = false) String category,
            @RequestParam(required = false) BigDecimal minAmount,
            @RequestParam(required = false) BigDecimal maxAmount,
            Authentication authentication
    ) {

        String email = authentication.getName();

        return expenseService.findExpenses(
                email,
                category,
                minAmount,
                maxAmount
        );
    }


    // ADD expense
    @PostMapping("/api/expenses")
    public Expense addExpense(
            @RequestBody @Valid Expense expense,
            Authentication authentication
    ) {

        String email = authentication.getName();

        return expenseService.addExpense(
                email,
                expense
        );
    }


    // UPDATE expense
    @PutMapping("/api/expenses/{id}")
    public Expense updateExpense(
            @PathVariable int id,
            @RequestBody @Valid Expense expense,
            Authentication authentication
    ) {

        String email = authentication.getName();

        return expenseService.updateExpense(
                id,
                email,
                expense
        );
    }


    // DELETE expense
    @DeleteMapping("/api/expenses/{id}")
    public String deleteExpense(
            @PathVariable int id,
            Authentication authentication
    ) {

        String email = authentication.getName();

        expenseService.deleteExpense(
                id,
                email
        );

        return "Expense deleted successfully";
    }
}