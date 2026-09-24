package io.github.fayaz.expensetracker.controller;

import io.github.fayaz.expensetracker.dto.LoginRequest;
import io.github.fayaz.expensetracker.dto.RegisterRequest;
import io.github.fayaz.expensetracker.dto.RegisterResponse;
import io.github.fayaz.expensetracker.model.User;
import io.github.fayaz.expensetracker.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }
    @PostMapping("/register")
    public RegisterResponse register(
            @Valid @RequestBody RegisterRequest request
    ) {
        return authService.register(request);
    }

    @PostMapping("/login")
    public String login(
         @Valid @RequestBody LoginRequest request
    ) {
        return authService.login(request);
    }
}