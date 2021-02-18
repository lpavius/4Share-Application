package com.paviuslucy.ForShare.repositories;

import com.paviuslucy.ForShare.entities.FileInfos;
import com.paviuslucy.ForShare.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface FileInfosRepository extends JpaRepository<FileInfos, Long> {

    List<FileInfos> findAllByVisibilityPublicTrueOrderByDateAddedDesc();

    List<FileInfos> findAllByUserOrderByDateAddedDesc(User user);

    @Query(value = "SELECT * FROM filesinfos f WHERE f.visibility_public = true AND f.filename LIKE %:keyword%",
            nativeQuery = true)
    List<FileInfos> searchByFilename(@Param("keyword") String keyword);
}
