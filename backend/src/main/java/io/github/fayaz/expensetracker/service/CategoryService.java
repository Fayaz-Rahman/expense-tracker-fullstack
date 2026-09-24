package io.github.fayaz.expensetracker.service;

import io.github.fayaz.expensetracker.dto.CategoryRequest;
import io.github.fayaz.expensetracker.dto.CategoryResponse;
import io.github.fayaz.expensetracker.model.Category;
import io.github.fayaz.expensetracker.model.User;
import io.github.fayaz.expensetracker.repository.CategoryRepository;
import io.github.fayaz.expensetracker.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoryService {

    private final CategoryRepository categoryRepository;
    private final UserRepository userRepository;

    public CategoryService(
            CategoryRepository categoryRepository,
            UserRepository userRepository
    ) {
        this.categoryRepository = categoryRepository;
        this.userRepository = userRepository;
    }


    public List<CategoryResponse> getCategories(
            String email
    ) {

        return categoryRepository
                .findByUserEmailOrderByNameAsc(email)
                .stream()
                .map(category ->
                        new CategoryResponse(
                                category.getId(),
                                category.getName()
                        )
                )
                .toList();
    }


    public CategoryResponse createCategory(
            String email,
            CategoryRequest request
    ) {

        String name =
                request.getName().trim();

        if (
                categoryRepository
                        .existsByUserEmailAndNameIgnoreCase(
                                email,
                                name
                        )
        ) {
            throw new RuntimeException(
                    "Category already exists"
            );
        }


        User user = userRepository
                .findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException(
                                "User not found"
                        )
                );


        Category category = new Category();

        category.setName(name);
        category.setUser(user);


        Category saved =
                categoryRepository.save(category);


        return new CategoryResponse(
                saved.getId(),
                saved.getName()
        );
    }
}