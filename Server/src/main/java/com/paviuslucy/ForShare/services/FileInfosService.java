package com.paviuslucy.ForShare.services;

import com.paviuslucy.ForShare.entities.FileInfos;
import org.springframework.web.multipart.MultipartFile;

public interface FileInfosService {

    FileInfos storeFile(MultipartFile file);
}
