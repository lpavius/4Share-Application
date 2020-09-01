package com.paviuslucy.ForShare.repositories;

import com.paviuslucy.ForShare.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {

    User findByUserName(String username);
}
