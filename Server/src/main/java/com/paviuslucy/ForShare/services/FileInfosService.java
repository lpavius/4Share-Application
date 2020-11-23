package com.paviuslucy.ForShare.services;

import com.paviuslucy.ForShare.dtos.FileInfosDto;
import com.paviuslucy.ForShare.entities.FileInfos;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface FileInfosService {

    FileInfosDto dataFileDto(FileInfos fileInfos);

    FileInfosDto storeFile(MultipartFile file);

    List<FileInfosDto> getFiles();

    FileInfosDto update(Long id, FileInfosDto fileInfosDto);
}
