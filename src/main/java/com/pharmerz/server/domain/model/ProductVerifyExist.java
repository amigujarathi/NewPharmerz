package com.pharmerz.server.domain.model;

import java.util.UUID;

/**
 * Created by User on 02-06-2017.
 */
public class ProductVerifyExist {

    private String productname;
    private UUID categeoryid;

    public ProductVerifyExist() {
    }


    public String getProductname() {
        return productname;
    }

    public void setProductname(String productname) {
        this.productname = productname;
    }

    public UUID getCategeoryid() {
        return categeoryid;
    }

    public void setCategeoryid(UUID categeoryid) {
        this.categeoryid = categeoryid;
    }
}
