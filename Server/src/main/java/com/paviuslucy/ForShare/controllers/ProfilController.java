package com.paviuslucy.ForShare.controllers;

import com.paviuslucy.ForShare.dtos.FileInfosDto;
import com.paviuslucy.ForShare.dtos.UserDto;
import com.paviuslucy.ForShare.entities.User;
import com.paviuslucy.ForShare.services.ProfilService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/profil")
public class ProfilController {

    @Autowired
    private ProfilService profilService;

    @GetMapping // "api/profil/
    public UserDto getProfil() {
        return profilService.getUserAuth();
    }

    @PutMapping // "api/profil/
    public UserDto UpdateProfil(@Valid @RequestBody UserDto userDto) {
        return profilService.update(userDto);
    }

    @GetMapping("/files")
    public List<FileInfosDto> getUserFiles() {
        return profilService.getListFiles();
    }
}
