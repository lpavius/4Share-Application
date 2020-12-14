package com.paviuslucy.ForShare.services;

import com.paviuslucy.ForShare.dtos.FileInfosDto;
import com.paviuslucy.ForShare.dtos.UserDto;
import com.paviuslucy.ForShare.entities.FileInfos;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface ProfilService {

    UserDto getUserAuth();

    UserDto update(UserDto userDto);

    List<FileInfosDto> getListFiles();
}
