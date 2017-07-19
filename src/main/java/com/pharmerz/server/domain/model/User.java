/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.pharmerz.server.domain.model;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.io.Serializable;
import java.util.Date;
import java.util.List;
import javax.persistence.*;

/**
 *
 * @author ankur
 */
@Entity
@Table(name = "USERS")
@EntityListeners(UsersEntityListener.class)
@NamedQueries({
    @NamedQuery(name = "User.findAll", query = "SELECT u FROM User u")})
public class User extends Domain implements Serializable {

    private static final long serialVersionUID = 1L;
    @Basic(optional = false)
    @Column(name = "FIRST_NAME", nullable = false)
    private String firstName;
    @Basic(optional = false)
    @Column(name = "LAST_NAME", nullable = false)
    private String lastName;
    @Column(name = "MIDDLE_NAME")
    private String middleName;
    @Basic(optional = false)
    @Column(name = "GENDER", nullable = false)
    private String gender;
    @Basic(optional = false)
    @Column(name = "MOBILE", nullable = false)
    private String mobile;
    @Basic(optional = false)
    @Column(name = "EMAIL", nullable = false)
    private String email;
    @Basic(optional = false)
    @Column(name = "USERNAME", nullable = false)
    private String username;
    @Basic(optional = false)
    @Column(name = "PASSWORD", nullable = false)
    private String password;
    @Column(name = "URL")
    private String url;

        @PrePersist
        public void encryptPassword(){
            this.setPassword(new BCryptPasswordEncoder().encode(getPassword()));
        }


    @OneToMany(cascade = CascadeType.ALL, mappedBy = "user")
    private List<UserRole> userRoles;
    @OneToOne(cascade = CascadeType.ALL, mappedBy = "user")
    private Organization organization;

    public User() {
    }


    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getMiddleName() {
        return middleName;
    }

    public void setMiddleName(String middleName) {
        this.middleName = middleName;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
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

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }


    public Organization getOrganization() {
        return organization;
    }

    public void setOrganization(Organization organization) {
        this.organization = organization;
    }

    public List<UserRole> getUserRoles() {
        return userRoles;
    }

    public void setUserRoles(List<UserRole> userRoles) {
        this.userRoles = userRoles;
    }


}
