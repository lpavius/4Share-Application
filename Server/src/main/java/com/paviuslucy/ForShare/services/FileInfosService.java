package com.paviuslucy.ForShare.services;

import com.paviuslucy.ForShare.dtos.FileInfosDto;
import com.paviuslucy.ForShare.entities.FileInfos;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface FileInfosService {

    FileInfosDto dataFileDto(FileInfos fileInfos);

    FileInfosDto storeFileToLocalSystem(MultipartFile file);

    FileInfosDto storeFileToDatabase(MultipartFile file) throws IOException;

    List<FileInfosDto> getFiles();

    FileInfos load(long id);

    FileInfosDto update(Long id, FileInfosDto fileInfosDto);

    void delete(long id);

    List<FileInfosDto> search(String filename);
}
