package com.pharmerz.server.domain.model;

import javax.persistence.*;
import java.io.Serializable;
import java.util.UUID;

/**
 * Created by User on 28-01-2017.
 */

@Entity
@Table(name ="USER_FORGET_PASSWORDS")
@NamedQueries({
        @NamedQuery(name = "ForgetPassword.findAll", query = "SELECT c FROM ForgetPassword c")})
public class ForgetPassword extends Domain implements Serializable {
    private static final long serialVersionUID = 1L;



        /***************Columns Parameters**************************/
        private String USER_ID;
        private String USERNAME;
        @Column(name = "EMAIL")
         private String emails;
        @Column(name = "MOBILE")
        private String mobile;
         @Column(name = "PASSWORD")
        private String password ;

        private String HASHCODE;
        private int FLAG;


    public ForgetPassword() {
    }

    public ForgetPassword(String USER_ID, String USERNAME, String emails, String MOBILE, String PASSWORD, String HASHCODE, int FLAG) {
        this.USER_ID = USER_ID;
        this.USERNAME = USERNAME;
        this.emails = emails;
        this.mobile = MOBILE;
        this.password = PASSWORD;
        this.HASHCODE = HASHCODE;
        this.FLAG = FLAG;
    }

    public static long getSerialVersionUID() {
        return serialVersionUID;
    }

    public String getUSER_ID() {
        return USER_ID;
    }

    public void setUSER_ID(String USER_ID) {
        this.USER_ID = USER_ID;
    }

    public String getUSERNAME() {
        return USERNAME;
    }

    public void setUSERNAME(String USERNAME) {
        this.USERNAME = USERNAME;
    }

    public String getEmails() {
        return emails;
    }

    public void setEmails(String emails) {
        this.emails = emails;
    }

    public String getMOBILE() {
        return mobile;
    }

    public void setMOBILE(String MOBILE) {
        this.mobile = MOBILE;
    }

    public String getPASSWORD() {
        return password;
    }

    public void setPASSWORD(String PASSWORD) {
        this.password = PASSWORD;
    }

    public String getHASHCODE() {
        return HASHCODE;
    }

    public void setHASHCODE(String HASHCODE) {
        this.HASHCODE = HASHCODE;
    }

    public int getFLAG() {
        return FLAG;
    }

    public void setFLAG(int FLAG) {
        this.FLAG = FLAG;
    }
}
