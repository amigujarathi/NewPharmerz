/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.pharmerz.server.domain.model;

import java.io.Serializable;
import java.util.Date;
import java.util.List;
import javax.persistence.*;

/**
 *
 * @author ankur
 */
@Entity
@Table(name = "ROLES")
@NamedQueries({
    @NamedQuery(name = "Role.findAll", query = "SELECT r FROM Role r")})
public class Role extends Domain implements Serializable {

    public enum RoleName{
        ROLE_USER, ROLE_ADMIN
    }

    private static final long serialVersionUID = 1L;
    @Basic(optional = false)
    @Column(name = "ROLE", nullable = false)
    @Enumerated(EnumType.STRING)
    private RoleName role;
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "role")
    private List<UserRole> userRoles;

    public Role() {
    }


    public RoleName getRole() {
        return role;
    }

    public void setRole(RoleName role) {
        this.role = role;
    }

    public List<UserRole> getUserRoles() {
        return userRoles;
    }

    public void setUserRoles(List<UserRole> userRoles) {
        this.userRoles = userRoles;
    }
}
