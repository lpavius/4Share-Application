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

    private long size;

    private Boolean visibilityPublic;

    private String owner;

    public FileInfosDto() {
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

    @Override
    public String toString() {
        return "FileInfosDto{" +
                ", filename='" + filename + '\'' +
                ", dateAdded='" + dateAdded + '\'' +
                ", size=" + size +
                ", visibilityPublic=" + visibilityPublic +
                ", owner='" + owner + '\'' +
                '}';
    }
}
