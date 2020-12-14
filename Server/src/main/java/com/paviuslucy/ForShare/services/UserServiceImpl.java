package com.paviuslucy.ForShare.services;

import com.paviuslucy.ForShare.dtos.FileInfosDto;
import com.paviuslucy.ForShare.dtos.UserCreateDto;
import com.paviuslucy.ForShare.dtos.UserDto;
import com.paviuslucy.ForShare.entities.User;
import com.paviuslucy.ForShare.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

@Service
public class UserServiceImpl implements UserService{

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private FileInfosService fileInfosService;

    //private final Path root = Paths.get("uploads");


    @Override
    public void create(UserCreateDto createDto) {
        User user = new User();
        user.setFirstName(createDto.getFirstName());
        user.setLastName(createDto.getLastName());
        user.setUserName(createDto.getUserName());
        user.setPassword(passwordEncoder.encode(createDto.getPassword()));
        user.setEnabled(true);
        userRepository.save(user);
        /*try {
            Files.createDirectories(Path.of(root + "\\" + Long.toString(user.getId())));
        } catch (IOException e) {
            throw new RuntimeException("Could not initialize folder for upload!");
        }*/
    }

    @Override
    public List<User> getAll() {
        return userRepository.findAll();
    }

    /*@Override
    public UserDto getByUsername(String username) {
        User user = userRepository.findByUserName(username);
        UserDto dto = new UserDto();
        dto.setId(user.getId());
        dto.setFirstName(user.getFirstName());
        dto.setLastName(user.getLastName());
        dto.setUserName(user.getUserName());
        dto.setPassword(user.getPassword());
        return dto;
    }*/

    @Override
    public UserDto getById(Long id) {
        User user = userRepository.findById(id).orElseThrow();
        UserDto dto = new UserDto();
        dto.setId(user.getId());
        dto.setFirstName(user.getFirstName());
        dto.setLastName(user.getLastName());
        dto.setUserName(user.getUserName());
        dto.setPassword(user.getPassword());
        return dto;
    }

    @Override
    public UserDto update(Long id, UserDto userDto) {
        User user = userRepository.findById(id).orElseThrow();
        if(id == null) {
            throw new UsernameNotFoundException("no user found with id: " + id);
        }
        user.setFirstName(userDto.getFirstName());
        user.setLastName(userDto.getLastName());
        user.setUserName(userDto.getUserName());
        userRepository.save(user);
        return userDto;
    }

    @Override
    public void delete(Long id) {
        userRepository.deleteById(id);
    }
}
