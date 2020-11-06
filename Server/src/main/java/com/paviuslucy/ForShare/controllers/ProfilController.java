package com.paviuslucy.ForShare.controllers;

import com.paviuslucy.ForShare.dtos.UserDto;
import com.paviuslucy.ForShare.entities.User;
import com.paviuslucy.ForShare.repositories.UserRepository;
import com.paviuslucy.ForShare.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/profil")
public class ProfilController {

    @Autowired
    private UserService userService;

    @GetMapping // "api/profil/
    public UserDto getProfil() {
        return userService.getUserAuth();
    }

    @PutMapping
    public UserDto UpdateProfil(@Valid @RequestBody UserDto userDto) {
        return userService.update(userDto);
    }
}
