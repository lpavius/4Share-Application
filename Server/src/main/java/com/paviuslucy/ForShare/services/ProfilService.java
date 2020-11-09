package com.paviuslucy.ForShare.services;

import com.paviuslucy.ForShare.dtos.UserDto;

public interface ProfilService {

    public UserDto getUserAuth();

    public UserDto update(UserDto userDto);
}
