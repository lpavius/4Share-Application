package com.paviuslucy.ForShare.controllers;

import com.paviuslucy.ForShare.dtos.UserCreateDto;
import com.paviuslucy.ForShare.dtos.UserDto;
import com.paviuslucy.ForShare.services.UserService;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@CrossOrigin
@RestController
@RequestMapping("/users") // "/api/users"
public class UserController {

    private UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/register") // "/api/users/register"
    public void createUser(@RequestBody @Valid UserCreateDto createDto) {
        userService.create(createDto);
    }

    @GetMapping("/{id}")
    public UserDto getUser(@PathVariable("id") Long id) {
        return userService.get(id);
    }
}
