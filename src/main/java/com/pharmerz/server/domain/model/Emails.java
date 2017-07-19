package com.pharmerz.server.domain.model;

import javax.persistence.*;
import java.io.Serializable;


/**
 * Created by Amit on 1/14/2017.
 */

@Entity
@Table(name = "USER_EMAILS")
@NamedQueries({
        @NamedQuery(name = "Emails.findAll", query = "SELECT c FROM Emails c")})
public class Emails extends Domain implements Serializable {

    private static final long serialVersionUID = 1L;

    /***************Columns Parameters**************************/

    @Column(name = "USER_ID")
    private String userid;
    @Column(name = "EMAIL")
    private String email;

    private String HASHCODE;
    @Basic(optional = false)
    @Column(nullable = false)
    private int VERIFIED;

    /***************Default Constructor**************************/

    public Emails() {
    }


    /***************Getter And Setters**************************/


    public String getUserid() {
        return userid;
    }

    public void setUserid(String userid) {
        this.userid = userid;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
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
