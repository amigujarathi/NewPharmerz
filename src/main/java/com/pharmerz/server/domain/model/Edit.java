package com.pharmerz.server.domain.model;

import java.util.UUID;

/**
 * Created by i5 on 5/23/2017.
 */
public class Edit {
    UUID id;
    String mobile;
    String email;

    public Edit() {
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public String getMobile() {
        return mobile;
    }

    public void setMobile(String mobile) {
        this.mobile = mobile;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}
