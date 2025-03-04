package com.ecomm.Ecommerce.controller;

import com.ecomm.Ecommerce.model.Users;
import com.ecomm.Ecommerce.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping("/api")
public class UserController {
    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public Users register(@RequestBody Users user) {
        return userService.register(user);
    }

    @GetMapping("/users/{username}")
    public Users findUserByUsername(@PathVariable String username) {
        Users user = userService.findUserByUsername(username);
        System.out.println(user.getPassword());
        return user;
    }

}