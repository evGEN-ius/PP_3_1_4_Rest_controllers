package ru.kata.spring.boot_security.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;
import ru.kata.spring.boot_security.demo.models.User;
import ru.kata.spring.boot_security.demo.service.UserServiceImpl;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping(value = "/api")
public class AdminController {

    private final UserServiceImpl userService;
    @Autowired
    public AdminController(UserServiceImpl userService) {
        this.userService = userService;
    }

    @GetMapping("/allUser")
    public List<User> listUsers() {
        return userService.getAllUsers();
    }

    @GetMapping( "/currentAdmin")
    public User getCurrentAdmin(Principal principal) {
        return userService.findByUsername(principal.getName());
    }

    @PostMapping("/add")
    public void addUser(@RequestBody User user) {
        userService.add(user);
    }

    @PostMapping("/update")
    public void updateUser(@RequestBody User user) {
        userService.update(user);
    }
    @GetMapping("/delete/{id}")
    public void deleteUser(@PathVariable("id") Long id) {
        userService.delete(id);
    }

}
