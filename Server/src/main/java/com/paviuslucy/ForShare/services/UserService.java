package com.paviuslucy.ForShare.services;

import com.paviuslucy.ForShare.dtos.UserCreateDto;
import com.paviuslucy.ForShare.dtos.UserDto;
import com.paviuslucy.ForShare.entities.User;

import java.util.List;

public interface UserService {

    void create(UserCreateDto createDto);

    List<User> getAll();

    //UserDto getByUsername(String username);

    UserDto getById(Long id);

    public UserDto update(Long id, UserDto userDto);

    void delete(Long id);
}
