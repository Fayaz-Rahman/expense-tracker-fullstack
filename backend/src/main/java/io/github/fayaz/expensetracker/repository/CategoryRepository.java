package io.github.fayaz.expensetracker.repository;

import io.github.fayaz.expensetracker.model.Category;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CategoryRepository
        extends JpaRepository<Category, Integer> {

    List<Category> findByUserEmailOrderByNameAsc(
            String email
    );

    boolean existsByUserEmailAndNameIgnoreCase(
            String email,
            String name
    );
}