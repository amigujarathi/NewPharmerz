/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.pharmerz.server.domain.model;

import java.io.Serializable;
import java.util.Date;
import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.Lob;
import javax.persistence.ManyToOne;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.persistence.UniqueConstraint;

/**
 *
 * @author ankur
 */
@Entity
@Table(name = "PURCHASERS", uniqueConstraints = {
    @UniqueConstraint(columnNames = {"ORGANIZATION_ID", "PRODUCT_ID"})})
@NamedQueries({
    @NamedQuery(name = "Purchaser.findAll", query = "SELECT p FROM Purchaser p")})
public class Purchaser extends Domain implements Serializable {

    private static final long serialVersionUID = 1L;
    @JoinColumn(name = "ORGANIZATION_ID", referencedColumnName = "ID", nullable = false)
    @ManyToOne(optional = false)
    private Organization organization;
    @JoinColumn(name = "PRODUCT_ID", referencedColumnName = "ID", nullable = false)
    @ManyToOne(optional = false)
    private Product product;

    public Purchaser() {
    }


    public Organization getOrganization() {
        return organization;
    }

    public void setOrganization(Organization organization) {
        this.organization = organization;
    }

    public Product getProduct() {
        return product;
    }

    public void setProduct(Product product) {
        this.product = product;
    }


}
