package io.github.fayaz.expensetracker.repository;

import io.github.fayaz.expensetracker.model.Expense;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.List;

public interface ExpenseRepository
        extends JpaRepository<Expense, Integer>,
        JpaSpecificationExecutor<Expense> {

    List<Expense> findByUserEmail(String email);
}