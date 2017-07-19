package com.pharmerz.server.domain.model;

import java.util.UUID;

/**
 * Created by User on 05-05-2017.
 */

public class Tricker {


    UUID id;
    String productname;

    public Tricker() {
    }

    public Tricker(UUID id, String productname) {
        this.id = id;
        this.productname = productname;
    }


    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public String getProductname() {
        return productname;
    }

    public void setProductname(String productname) {
        this.productname = productname;
    }
}
