package com.paviuslucy.ForShare.services;

import com.paviuslucy.ForShare.dtos.FileInfosDto;
import com.paviuslucy.ForShare.dtos.UserDto;
import com.paviuslucy.ForShare.entities.FileInfos;

import java.util.List;

public interface ProfilService {

    public UserDto getUserAuth();

    public UserDto update(UserDto userDto);

    List<FileInfosDto> getlistFile();
}
