package com.paviuslucy.ForShare.entities;

import javax.persistence.Entity;
import javax.persistence.Table;
import java.time.LocalDate;
import java.time.LocalDateTime;

//@Entity
//@Table(name = "files")
public class files {

    private Long id;

    private String filename;

    private LocalDateTime dateAdded;

    private Long category;

}
