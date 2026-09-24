package io.github.fayaz.expensetracker.repository;

import io.github.fayaz.expensetracker.model.Budget;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface BudgetRepository
        extends JpaRepository<Budget, Integer> {

    Optional<Budget> findByUserEmail(String email);
}