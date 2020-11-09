package com.paviuslucy.ForShare.controllers;

import com.paviuslucy.ForShare.dtos.UserCreateDto;
import com.paviuslucy.ForShare.dtos.UserDto;
import com.paviuslucy.ForShare.entities.User;
import com.paviuslucy.ForShare.services.UserService;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

//@CrossOrigin
@RestController
@RequestMapping("/users") // "/api/users"
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    // CREATE a new User
    @PostMapping("/register") // "/api/users/register"
    public void createUser(@RequestBody @Valid UserCreateDto createDto) {
        userService.create(createDto);
    }

    // GET the list of users
    @GetMapping("/list")
    public List<User> getAllUser() {
        return userService.getAll();
    }

    // GET a User by Username
    /*@GetMapping("/{username}")
    public UserDto getUserByUsername(@PathVariable("username") String username) {
        return userService.getByUsername(username);
    }*/

    // GET a user by ID
    @GetMapping("/{id}")
    public UserDto getUserById(@PathVariable("id") Long id) {
        return userService.getById(id);
    }

    @PutMapping("/{id}")
    public UserDto updateUser(@PathVariable("id") Long id, @RequestBody @Valid UserDto userDto) {
        return userService.update(id, userDto);
    }

    @DeleteMapping("/{id}")
    public void deleteUser(@PathVariable("id") Long id) {
        userService.delete(id);
    }
}
