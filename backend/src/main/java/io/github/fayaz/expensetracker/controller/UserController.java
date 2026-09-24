package io.github.fayaz.expensetracker.controller;

import io.github.fayaz.expensetracker.model.User;
import io.github.fayaz.expensetracker.service.UserService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping
    public User addUser(@RequestBody User user) {
        return userService.addUser(user);
    }

    @GetMapping("/{id}")
    public User getUser(@PathVariable Integer id) {
        return userService.findById(id);
    }

    @GetMapping
    public List<User> getUsers() {
        return userService.findAll();
    }
}