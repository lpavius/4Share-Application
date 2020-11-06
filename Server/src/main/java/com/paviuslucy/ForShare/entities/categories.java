package com.paviuslucy.ForShare.entities;

import javax.persistence.*;

//@Entity
//@Table(name = "categories")
public class categories {

    //@Id
    //@GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    //@Column
    private String name;

    public categories() {
        //
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @Override
    public String toString() {
        return "categories{" +
                "id=" + id +
                ", name='" + name + '\'' +
                '}';
    }
}
