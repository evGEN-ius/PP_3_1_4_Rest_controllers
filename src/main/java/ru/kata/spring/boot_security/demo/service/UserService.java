package ru.kata.spring.boot_security.demo.service;

import org.springframework.security.core.userdetails.UserDetailsService;
import ru.kata.spring.boot_security.demo.models.User;

import java.util.List;

public interface UserService extends UserDetailsService {
    void add(User user);
    List<User> getAllUsers();
    void update (User upUser);
    void delete (long id);
    User show (long id);
}
