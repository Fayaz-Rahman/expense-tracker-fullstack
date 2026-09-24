package io.github.fayaz.expensetracker.service;

import io.github.fayaz.expensetracker.exception.UserNotFoundException;
import io.github.fayaz.expensetracker.model.User;
import io.github.fayaz.expensetracker.repository.UserRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User addUser(User user) {
        return userRepository.save(user);
    }

    public User findById(Integer id) {
        return userRepository.findById(id)
                .orElseThrow(() ->
                        new UserNotFoundException(
                                "User with id " + id + " not found"
                        )
                );
    }

    public List<User> findAll() {
        return userRepository.findAll();
    }
}