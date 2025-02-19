package ru.kata.spring.boot_security.demo.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class LoginController {
    @GetMapping(value = "/login")
    public String loginPage() {
        return "/index";
    }

    @GetMapping(value = "/admin")
    public String loginAdmin() {
        return "admin";
    }

    @GetMapping(value = "/user")
    public String loginUser() {
        return "user";
    }
}
