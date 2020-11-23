package com.paviuslucy.ForShare.services;

import com.paviuslucy.ForShare.dtos.FileInfosDto;
import com.paviuslucy.ForShare.dtos.UserDto;
import com.paviuslucy.ForShare.entities.FileInfos;
import com.paviuslucy.ForShare.entities.User;
import com.paviuslucy.ForShare.repositories.UserRepository;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

@Service
public class ProfilServiceImpl implements ProfilService {

    private final UserRepository userRepository;

    private final FileInfosService fileInfosService;

    public ProfilServiceImpl(UserRepository userRepository, FileInfosService fileInfosService) {
        this.userRepository = userRepository;
        this.fileInfosService = fileInfosService;
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

    @Override
    public List<FileInfosDto> getlistFile(){
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepository.findByUserName(username);
        //return user.getFilesDto();
        FileInfosDto fileDto = new FileInfosDto();
        List<FileInfosDto> filesInfosDto = new ArrayList<>();
        List<FileInfos> list = user.getMyFiles();
        for (FileInfos file: user.getMyFiles()) {
            /*fileDto.setId(file.getId());
            fileDto.setFilename(file.getFilename());
            fileDto.setDateAdded(file.getDateAdded().format(DateTimeFormatter.ofPattern("dd/MM/yyyy")));
            fileDto.setOwner(file.getUser().getFirstName() + " " + file.getUser().getLastName());
            fileDto.setSize(file.getSize());
            fileDto.setVisibilityPublic(file.getVisibilityPublic());
            filesInfosDto.add(fileDto);*/
            fileDto = fileInfosService.dataFileDto(file);
            filesInfosDto.add(fileDto);
        }
        return filesInfosDto;
    }
}
