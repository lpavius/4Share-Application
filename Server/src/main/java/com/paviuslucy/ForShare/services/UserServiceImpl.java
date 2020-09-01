package com.paviuslucy.ForShare.services;

import com.paviuslucy.ForShare.dtos.UserCreateDto;
import com.paviuslucy.ForShare.dtos.UserDto;
import com.paviuslucy.ForShare.entities.User;
import com.paviuslucy.ForShare.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService{

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public void create(UserCreateDto createDto) {
        User user = new User();
        user.setFirstName(createDto.getFirstName());
        user.setLastName(createDto.getLastName());
        user.setUserName(createDto.getUserName());
        user.setPassword(passwordEncoder.encode(createDto.getPassword()));
        user.setEnabled(true);
        userRepository.save(user);
    }

    @Override
    public UserDto get(String username) {
        User user = userRepository.findByUserName(username);
        UserDto dto = new UserDto();
        dto.setId(user.getId());
        dto.setFirstName(user.getFirstName());
        dto.setLastName(user.getLastName());
        dto.setUserName(user.getUserName());
        dto.setPassword(user.getPassword());
        return dto;
    }
}
