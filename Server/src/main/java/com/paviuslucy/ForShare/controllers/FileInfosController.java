package com.paviuslucy.ForShare.controllers;

import com.paviuslucy.ForShare.dtos.FileInfosDto;
import com.paviuslucy.ForShare.entities.FileInfos;
import com.paviuslucy.ForShare.services.FileInfosService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@RestController
@RequestMapping("/files")
public class FileInfosController {

    @Autowired
    private FileInfosService fileInfosService;

    @PostMapping("/upload")
    public void upload(@RequestParam("files") MultipartFile[] files) throws IOException {
        List<FileInfosDto> list = new ArrayList<>();
        for (MultipartFile file : Arrays.asList(files)) {
            FileInfosDto fileInfosDto = fileInfosService.storeFileToDatabase(file);
            list.add(fileInfosDto);
        }
        //return list;
    }

    @GetMapping
    public List<FileInfosDto> getFilesPublic() {
        return fileInfosService.getFiles();
    }

    @PutMapping("/update/{id}")
    public FileInfosDto updateFile(@PathVariable("id")Long id, @RequestBody FileInfosDto fileInfosDto) {
        return fileInfosService.update(id, fileInfosDto);
    }

    @GetMapping("/download/{id}")
    public ResponseEntity<byte[]> downloadFile(@PathVariable("id") long id) {
        FileInfos fileInfos = fileInfosService.load(id);
        //filename = fileInfos.getFilename();

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachement; filename=\"" + fileInfos.getFilename() + "\"")
                .body(fileInfos.getFile());
    }

    @DeleteMapping("/{id}")
    public void deleteFile(@PathVariable("id") long id) {
        fileInfosService.delete(id);
    }

    @GetMapping("/search/{keyword}")
    List<FileInfosDto> searchFiles(@PathVariable("keyword") String keyword) {
        return fileInfosService.search(keyword);
    }
}
