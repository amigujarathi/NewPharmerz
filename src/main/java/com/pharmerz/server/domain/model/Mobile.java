package com.pharmerz.server.domain.model;

import javax.persistence.*;
import java.io.Serializable;

/**
 * Created by i5 on 1/25/2017.
 */

@Entity
@Table(name = "USER_MOBILES")
@NamedQueries({
        @NamedQuery(name = "Mobile.findAll", query = "SELECT c FROM Mobile c")})
public class Mobile extends Domain implements Serializable {

    private static final long serialVersionUID = 1L;

    /***************Columns Parameters**************************/

    @Column(name = "USER_ID")
    private String userid;
    @Column(name = "MOBILE")
    private String mob;
    private String HASHCODE;
    @Basic(optional = false)
    @Column(nullable = false)
    private int VERIFIED;


    /***************Default Constructor**************************/

    public Mobile() {
    }

    /***************Getter And Setters**************************/

    public String getUserid() {
        return userid;
    }

    public void setUserid(String userid) {
        this.userid = userid;
    }

    public String getMob() {
        return mob;
    }

    public void setMob(String mob) {
        this.mob = mob;
    }

    public String getHASHCODE() {
        return HASHCODE;
    }

    public void setHASHCODE(String HASHCODE) {
        this.HASHCODE = HASHCODE;
    }

    public int getVERIFIED() {
        return VERIFIED;
    }

    public void setVERIFIED(int VERIFIED) {
        this.VERIFIED = VERIFIED;
    }
}
