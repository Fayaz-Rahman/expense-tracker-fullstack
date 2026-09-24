package io.github.fayaz.expensetracker.controller;

import io.github.fayaz.expensetracker.dto.CategoryRequest;
import io.github.fayaz.expensetracker.dto.CategoryResponse;
import io.github.fayaz.expensetracker.service.CategoryService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/categories")
public class CategoryController {

    private final CategoryService categoryService;

    public CategoryController(
            CategoryService categoryService
    ) {
        this.categoryService = categoryService;
    }


    @GetMapping
    public ResponseEntity<List<CategoryResponse>> getCategories(
            Authentication authentication
    ) {

        String email =
                authentication.getName();

        return ResponseEntity.ok(
                categoryService.getCategories(email)
        );
    }


    @PostMapping
    public ResponseEntity<CategoryResponse> createCategory(
            Authentication authentication,
            @Valid @RequestBody CategoryRequest request
    ) {

        String email =
                authentication.getName();

        return ResponseEntity.ok(
                categoryService.createCategory(
                        email,
                        request
                )
        );
    }
}