package io.github.fayaz.expensetracker.controller;

import io.github.fayaz.expensetracker.dto.BudgetRequest;
import io.github.fayaz.expensetracker.dto.BudgetResponse;
import io.github.fayaz.expensetracker.service.BudgetService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/budget")
public class BudgetController {

    private final BudgetService budgetService;

    public BudgetController(
            BudgetService budgetService
    ) {
        this.budgetService = budgetService;
    }


    @GetMapping
    public ResponseEntity<?> getBudget(
            Authentication authentication
    ) {

        String email = authentication.getName();

        return budgetService
                .getBudget(email)
                .map(ResponseEntity::ok)
                .orElseGet(() ->
                        ResponseEntity.noContent().build()
                );
    }


    @PutMapping
    public ResponseEntity<BudgetResponse> saveOrUpdateBudget(
            Authentication authentication,
            @Valid @RequestBody BudgetRequest request
    ) {

        String email = authentication.getName();

        BudgetResponse response =
                budgetService.saveOrUpdateBudget(
                        email,
                        request
                );

        return ResponseEntity.ok(response);
    }
}