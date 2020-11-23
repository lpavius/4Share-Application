package com.paviuslucy.ForShare.services;

import com.paviuslucy.ForShare.dtos.FileInfosDto;
import com.paviuslucy.ForShare.entities.FileInfos;
import com.paviuslucy.ForShare.entities.User;
import com.paviuslucy.ForShare.repositories.FileInfosRepository;
import com.paviuslucy.ForShare.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

@Service
public class FileInfosServiceImpl implements FileInfosService{

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private FileInfosRepository fileInfosRepository;

    private final Path root = Paths.get("uploads");

    @Override
    public FileInfosDto dataFileDto(FileInfos fileInfos) {
        FileInfosDto fileDto = new FileInfosDto();

        fileDto.setId(fileInfos.getId());
        fileDto.setFilename(fileInfos.getFilename());
        fileDto.setDateAdded(fileInfos.getDateAdded().format(DateTimeFormatter.ofPattern("dd/MM/yyyy")));
        fileDto.setOwner(fileInfos.getUser().getFirstName() + " " + fileInfos.getUser().getLastName());
        fileDto.setSize(fileInfos.getSize());
        fileDto.setVisibilityPublic(fileInfos.getVisibilityPublic());
        return fileDto;
    }

    @Override
    public FileInfosDto storeFile(MultipartFile file) {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepository.findByUserName(username);
        String filename = file.getOriginalFilename();
        FileInfos fileInfos = new FileInfos();

        try {
            // Check if the file's name contains invalid characters
            if(filename.contains("..")) {
                throw new RuntimeException("Sorry! Filename contains invalid path sequence " + filename);
            }

            // Copy file to the target location (Replacing existing file with the same name)
            Path targetLocation = Path.of(root + "\\" + user.getUserName()).resolve(filename);
            Files.copy(file.getInputStream(), targetLocation, StandardCopyOption.REPLACE_EXISTING);

            fileInfos.setFilename(filename);
            fileInfos.setDateAdded(LocalDate.now());
            //fileInfos.setFileURL();
            fileInfos.setType(file.getContentType());
            fileInfos.setSize(file.getSize());
            fileInfos.setUser(user);
            //fileInfos.setVisibilityPublic(false);
            fileInfosRepository.save(fileInfos);

            return dataFileDto(fileInfos);
        } catch (IOException ex) {
            throw new RuntimeException("Could not store file " + filename + ". Please try again!", ex);
        }
    }

    @Override
    public List<FileInfosDto> getFiles() {
        List<FileInfos> fileInfos = fileInfosRepository.findAllByVisibilityPublicTrue();
        List<FileInfosDto> fileInfosDtos = new ArrayList<>();
        for (FileInfos file: fileInfos) {
            fileInfosDtos.add(dataFileDto(file));
        }
        return fileInfosDtos;
    }

    @Override
    public FileInfosDto update(Long id, FileInfosDto fileInfosDto) {
        FileInfos fileInfos = fileInfosRepository.findById(id).get();
        fileInfos.setFilename(fileInfosDto.getFilename());
        if (fileInfosDto.getVisibilityPublic() == null) {
            fileInfos.setVisibilityPublic(false);
        } else {
            fileInfos.setVisibilityPublic(fileInfosDto.getVisibilityPublic());
        }
        fileInfosRepository.save(fileInfos);
        return fileInfosDto;
    }


}
