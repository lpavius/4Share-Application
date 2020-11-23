package com.paviuslucy.ForShare.entities;

import com.paviuslucy.ForShare.dtos.FileInfosDto;

import javax.persistence.*;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "firstname", nullable = false)
    private String firstName;

    @Column(name = "lastname", nullable = false)
    private String lastName;

    @Column(name = "username", nullable = false, unique = true)
    private String userName;

    @Column(nullable = false, length = 60)
    private String password;

    @Column(nullable = false)
    private boolean enabled;

    @OneToMany(mappedBy = "user",
               cascade = CascadeType.REMOVE,
               fetch = FetchType.LAZY)
    private List<FileInfos> myFiles;

    //private List<FileInfosDto> filesDto;

    public User() {
        //
    }


    public User(String firstName, String lastName, String userName, String password, boolean enabled) {
        //this.id = id;
        Path root = Paths.get("uploads");
        this.firstName = firstName;
        this.lastName = lastName;
        this.userName = userName;
        this.password = password;
        this.enabled = enabled;
        try {
            Files.createDirectories(Path.of(root + "\\" +userName));
        } catch (IOException e) {
            throw new RuntimeException("Could not initialize folder for upload!");
        }
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public boolean isEnabled() {
        return enabled;
    }

    public void setEnabled(boolean enabled) {
        this.enabled = enabled;
    }

    public List<FileInfos> getMyFiles() {
        return myFiles;
    }

    public void setMyFiles(List<FileInfos> myFiles) {
        this.myFiles = myFiles;
    }

    /*public List<FileInfosDto> getFilesDto() {
        FileInfosDto fileDto = new FileInfosDto();
        List<FileInfosDto> filesInfosDto = new ArrayList<>();
        for (FileInfos file: getMyFiles()) {
            fileDto.setId(file.getId());
            fileDto.setFilename(file.getFilename());
            fileDto.setDateAdded(file.getDateAdded().format(DateTimeFormatter.ofPattern("dd/MM/yyyy")));
            fileDto.setOwner(file.getUser().getFirstName() + " " + file.getUser().getLastName());
            fileDto.setSize(file.getSize());
            fileDto.setVisibilityPublic(file.getVisibilityPublic());
            filesInfosDto.add(fileDto);
        }
        return filesInfosDto;
    }

    public void setFilesDto(List<FileInfosDto> filesDto) {
        this.filesDto = filesDto;
    }*/

    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", firstName='" + firstName + '\'' +
                ", lastName='" + lastName + '\'' +
                ", userName='" + userName + '\'' +
                ", password=[PROTECTED]" +
                ", enabled=" + enabled +
                '}';
    }
}
