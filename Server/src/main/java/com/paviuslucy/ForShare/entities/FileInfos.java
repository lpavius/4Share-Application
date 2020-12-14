package com.paviuslucy.ForShare.entities;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "filesinfos")
public class FileInfos {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private String filename;

    @Column
    private byte[] file;

    @Column
    private LocalDate dateAdded;

    @Column
    private String type;

    @Column
    private long size;

    @Column
    private Boolean visibilityPublic;

    @ManyToOne
    @JoinColumn(name = "id_user")
    private User user;

    public FileInfos() {
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

    public byte[] getFile() {
        return file;
    }

    public void setFile(byte[] file) {
        this.file = file;
    }

    public LocalDate getDateAdded() {
        return dateAdded;
    }

    public void setDateAdded(LocalDate dateAdded) {
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

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    @Override
    public String toString() {
        return "FileInfos{" +
                "id=" + id +
                ", filename='" + filename + '\'' +
                ", dateAdded=" + dateAdded +
                ", type='" + type + '\'' +
                ", size=" + size +
                ", visibilityPublic=" + visibilityPublic +
                ", user=" + user +
                '}';
    }
}
