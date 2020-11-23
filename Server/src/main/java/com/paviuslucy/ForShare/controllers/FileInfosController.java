package com.paviuslucy.ForShare.controllers;

import com.paviuslucy.ForShare.dtos.FileInfosDto;
import com.paviuslucy.ForShare.entities.FileInfos;
import com.paviuslucy.ForShare.entities.User;
import com.paviuslucy.ForShare.services.FileInfosService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/files")
public class FileInfosController {

    @Autowired
    private FileInfosService fileInfosService;

    @PostMapping("/upload")
    public List<FileInfosDto> upload(@RequestParam("files") MultipartFile[] files) {
        return Arrays.asList(files)
                .stream()
                .map(file -> fileInfosService.storeFile(file))
                .collect(Collectors.toList());
    }

    @GetMapping
    public List<FileInfosDto> getFilesPublic() {
        return fileInfosService.getFiles();
    }

    @PutMapping("/update/{id}")
    public FileInfosDto updateFile(@PathVariable("id")Long id, FileInfosDto fileInfosDto) {
        return fileInfosService.update(id, fileInfosDto);
    }
}
