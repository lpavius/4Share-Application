package com.paviuslucy.ForShare.repositories;

import com.paviuslucy.ForShare.entities.FileInfos;
import com.paviuslucy.ForShare.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FileInfosRepository extends JpaRepository<FileInfos, Long> {

    List<FileInfos> findAllByVisibilityPublicTrue();
    List<FileInfos> findAllByUser(User user);
}
