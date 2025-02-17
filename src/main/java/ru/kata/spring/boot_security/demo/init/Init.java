package ru.kata.spring.boot_security.demo.init;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import ru.kata.spring.boot_security.demo.dao.RoleDao;
import ru.kata.spring.boot_security.demo.models.Role;
import ru.kata.spring.boot_security.demo.models.User;
import ru.kata.spring.boot_security.demo.service.UserServiceImpl;
import javax.annotation.PostConstruct;
import java.util.HashSet;
import java.util.Set;

@Component
public class Init {

    private final RoleDao roleDao;
    private final UserServiceImpl userService;

    @Autowired
    public Init(RoleDao roleDao,UserServiceImpl userService) {
        this.roleDao = roleDao;
        this.userService = userService;
        addRoles();
    }

    private void addRoles() {
       roleDao.save(new Role(1L, "ROLE_ADMIN"));
       roleDao.save(new Role(2L, "ROLE_USER"));
    }

    @PostConstruct
    public User createAdmin() {
        if (userService.findByUsername("testAdmin@mail.ru") == null) {
            Set<Role> roleAdminUser = new HashSet<>();
            roleAdminUser.add((new Role(1L, "ROLE_ADMIN")));
            User user = new User("admin", "admin",12, "testAdmin@mail.ru", "admin", roleAdminUser);
            userService.add(user);
        }
        return null;
    }

}