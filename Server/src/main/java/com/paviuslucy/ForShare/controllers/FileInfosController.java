package com.paviuslucy.ForShare.controllers;

import com.paviuslucy.ForShare.entities.FileInfos;
import com.paviuslucy.ForShare.entities.User;
import com.paviuslucy.ForShare.services.FileInfosService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
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
    public List<FileInfos> upload(@RequestParam("files") MultipartFile[] files) {
        return Arrays.asList(files)
                .stream()
                .map(file -> fileInfosService.storeFile(file))
                .collect(Collectors.toList());
    }
}
