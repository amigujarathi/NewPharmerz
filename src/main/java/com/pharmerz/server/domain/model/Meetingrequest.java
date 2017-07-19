package com.pharmerz.server.domain.model;

import javax.persistence.*;
import java.io.Serializable;
import java.util.UUID;

/**
 * Created by User on 25-05-2017.
 */

@Entity
@Table(name = "MEETINGREQUESTS")
@NamedQueries({
        @NamedQuery(name = "Meetingrequests.findAll", query = "SELECT m FROM Meetingrequest m")})
public class Meetingrequest extends Domain implements Serializable {

    private static final long serialVersionUID = 1L;

    @Column(name = "USER_ID")
    private UUID userid;
    @Column(name = "COMPANY")
    private String company;
    @Column(name = "EMAIL_TO")
    private String emailto;
    @Column(name = "SUBJECT")
    private String subject;
    @Column(name = "BODY")
    private String body;
    @Column(name = "SENDER")
    private String sender;
    @Column(name = "FIRST_NAME")
    private String firstname;
    @Column(name = "LAST_NAME")
    private String lastname;


    public Meetingrequest() {
    }


    public static long getSerialVersionUID() {
        return serialVersionUID;
    }

    public UUID getUserid() {
        return userid;
    }

    public void setUserid(UUID userid) {
        this.userid = userid;
    }

    public String getCompany() {
        return company;
    }

    public void setCompany(String company) {
        this.company = company;
    }

    public String getEmailto() {
        return emailto;
    }

    public void setEmailto(String emailto) {
        this.emailto = emailto;
    }

    public String getSubject() {
        return subject;
    }

    public void setSubject(String subject) {
        this.subject = subject;
    }

    public String getBody() {
        return body;
    }

    public void setBody(String body) {
        this.body = body;
    }

    public String getSender() {
        return sender;
    }

    public void setSender(String sender) {
        this.sender = sender;
    }

    public String getFirstname() {
        return firstname;
    }

    public void setFirstname(String firstname) {
        this.firstname = firstname;
    }

    public String getLastname() {
        return lastname;
    }

    public void setLastname(String lastname) {
        this.lastname = lastname;
    }
}
