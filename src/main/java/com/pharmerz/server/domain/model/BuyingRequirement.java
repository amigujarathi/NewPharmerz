package com.pharmerz.server.domain.model;

import javax.persistence.*;
import java.io.Serializable;

/**
 * Created by Amit on 07-06-2017.
 */

@Entity
@Table(name = "BUYINGREQUIREMENTS")
@NamedQueries({
        @NamedQuery(name = "BuyingRequirement.findAll", query = "SELECT b FROM BuyingRequirement b")})
public class BuyingRequirement extends Domain implements Serializable {
    private static final long serialVersionUID = 1L;

    @Column(name = "PRODUCT_NAME", nullable = false)
    private String productname;

    @Column(name = "NAME", nullable = false)
    private String name;

    @Column(name = "MOBILE", nullable = false)
    private String mobile;

    @Column(name = "EMAIL", nullable = false)
    private String email;

    @Column(name = "CITY")
    private String city;


    public BuyingRequirement() {
    }


    public String getProductname() {
        return productname;
    }

    public void setProductname(String productname) {
        this.productname = productname;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
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

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }
}
