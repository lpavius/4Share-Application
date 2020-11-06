package com.paviuslucy.ForShare.services;

import com.paviuslucy.ForShare.entities.User;
import com.paviuslucy.ForShare.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
public class ApplicationServiceImpl implements ApplicationService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    @Transactional
    public void insertData() {
        //mdp = "motdepasse"
        User first =  new User("1er", "Utilisateur", "utilisateur@test.com", passwordEncoder.encode("motdepasse"), true);
        userRepository.save(first);
        //mdp = "password"
        userRepository.save(new User("Jenny", "Valdez", "jenny@test.com", passwordEncoder.encode("password"), true));
    }
}
