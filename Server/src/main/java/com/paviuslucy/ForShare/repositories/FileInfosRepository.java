package com.paviuslucy.ForShare.repositories;

import com.paviuslucy.ForShare.entities.FileInfos;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FileInfosRepository extends JpaRepository<FileInfos, Long> {

    List<FileInfos> findAllByVisibilityPublicTrue();
}
