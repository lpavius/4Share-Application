package com.paviuslucy.ForShare.dtos;

import com.paviuslucy.ForShare.entities.User;

import javax.persistence.Column;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import java.time.LocalDate;

public class FileInfosDto {

    private Long id;

    private String filename;

    private String dateAdded; // LocalDate.now().format(DateTimeFormatter.ofPattern("dd/MM/yyyy"));

    private String type;

    private long size;

    private Boolean visibilityPublic;

    private String owner;

    private String fileDownloadUrl;

    public FileInfosDto() {
    }

    public FileInfosDto(long id, String filename, String fileDownloadUrl, String dateAdded, String type, long size, Boolean visibilityPublic) {
        this.id = id;
        this.filename = filename;
        this.dateAdded = dateAdded;
        this.type = type;
        this.size = size;
        this.visibilityPublic = visibilityPublic;
        this.fileDownloadUrl = fileDownloadUrl;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFilename() {
        return filename;
    }

    public void setFilename(String filename) {
        this.filename = filename;
    }

    public String getDateAdded() {
        return dateAdded;
    }

    public void setDateAdded(String dateAdded) {
        this.dateAdded = dateAdded;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public long getSize() {
        return size;
    }

    public void setSize(long size) {
        this.size = size;
    }

    public Boolean getVisibilityPublic() {
        return visibilityPublic;
    }

    public void setVisibilityPublic(Boolean visibilityPublic) {
        this.visibilityPublic = visibilityPublic;
    }

    public String getOwner() {
        return owner;
    }

    public void setOwner(String owner) {
        this.owner = owner;
    }

    public String getFileDownloadUrl() {
        return fileDownloadUrl;
    }

    public void setFileDownloadUrl(String fileDownloadUrl) {
        this.fileDownloadUrl = fileDownloadUrl;
    }

    @Override
    public String toString() {
        return "FileInfosDto{" +
                "id=" + id +
                ", filename='" + filename + '\'' +
                ", dateAdded='" + dateAdded + '\'' +
                ", type='" + type + '\'' +
                ", size=" + size +
                ", visibilityPublic=" + visibilityPublic +
                ", owner='" + owner + '\'' +
                ", fileDownloadUrl='" + fileDownloadUrl + '\'' +
                '}';
    }
}
