package com.paviuslucy.ForShare.services;

import com.paviuslucy.ForShare.entities.User;
import com.paviuslucy.ForShare.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.util.FileSystemUtils;

import javax.transaction.Transactional;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@Service
public class ApplicationServiceImpl implements ApplicationService {

    //private final Path root = Paths.get("uploads");
    //private final Path root2 = Paths.get(`upload`);

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    /*@Override
    public void deleteRepository() {
        FileSystemUtils.deleteRecursively(root.toFile());
    }

    @Override
    public void initRepository() {
        try {
            Files.createDirectory(root);
            //Files.createDirectory(Path.of(root + "\\1"));
        } catch (IOException e) {
            throw new RuntimeException("Could not initialize folder for upload!");
        }
    }*/

    @Override
    @Transactional
    public void insertData() {
        User first =  new User("1er", "Utilisateur", "utilisateur@test.com", passwordEncoder.encode("motdepasse"), true);
        userRepository.save(first);
        userRepository.save(new User("Jenny", "Valdez", "jenny@test.com", passwordEncoder.encode("password"), true));
    }
}
