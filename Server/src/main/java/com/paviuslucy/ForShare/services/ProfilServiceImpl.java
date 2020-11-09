package com.paviuslucy.ForShare.services;

import com.paviuslucy.ForShare.dtos.UserDto;
import com.paviuslucy.ForShare.entities.User;
import com.paviuslucy.ForShare.repositories.UserRepository;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class ProfilServiceImpl implements ProfilService {

    private final UserRepository userRepository;

    public ProfilServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDto getUserAuth() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepository.findByUserName(username);
        UserDto userDto = new UserDto();
        userDto.setId(user.getId());
        userDto.setFirstName(user.getFirstName());
        userDto.setLastName(user.getLastName());
        userDto.setUserName(user.getUserName());
        userDto.setPassword(user.getPassword());
        return  userDto;
    }

    @Override
    public UserDto update(UserDto userDto) {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepository.findByUserName(username);
        if(username == null) {
            throw new UsernameNotFoundException("no user found with username: " + username);
        }
        user.setFirstName(userDto.getFirstName());
        user.setLastName(userDto.getLastName());
        user.setUserName(userDto.getUserName());
        userRepository.save(user);
        return userDto;
    }
}
