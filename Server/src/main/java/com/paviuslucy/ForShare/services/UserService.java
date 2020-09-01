package com.paviuslucy.ForShare.services;

import com.paviuslucy.ForShare.dtos.UserCreateDto;
import com.paviuslucy.ForShare.dtos.UserDto;

public interface UserService {

    void create(UserCreateDto createDto);
    UserDto get(String username);
}
