package io.github.fayaz.expensetracker.service;

import io.github.fayaz.expensetracker.dto.BudgetRequest;
import io.github.fayaz.expensetracker.dto.BudgetResponse;
import io.github.fayaz.expensetracker.model.Budget;
import io.github.fayaz.expensetracker.model.User;
import io.github.fayaz.expensetracker.repository.BudgetRepository;
import io.github.fayaz.expensetracker.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class BudgetService {

    private final BudgetRepository budgetRepository;
    private final UserRepository userRepository;

    public BudgetService(
            BudgetRepository budgetRepository,
            UserRepository userRepository
    ) {
        this.budgetRepository = budgetRepository;
        this.userRepository = userRepository;
    }

    public Optional<BudgetResponse> getBudget(String email) {

        return budgetRepository
                .findByUserEmail(email)
                .map(budget ->
                        new BudgetResponse(
                                budget.getId(),
                                budget.getAmount()
                        )
                );
    }

    public BudgetResponse saveOrUpdateBudget(
            String email,
            BudgetRequest request
    ) {

        User user = userRepository
                .findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException(
                                "User not found"
                        )
                );

        Budget budget = budgetRepository
                .findByUserEmail(email)
                .orElseGet(() -> {

                    Budget newBudget = new Budget();

                    newBudget.setUser(user);

                    return newBudget;
                });

        budget.setAmount(request.getAmount());

        Budget savedBudget =
                budgetRepository.save(budget);

        return new BudgetResponse(
                savedBudget.getId(),
                savedBudget.getAmount()
        );
    }
}