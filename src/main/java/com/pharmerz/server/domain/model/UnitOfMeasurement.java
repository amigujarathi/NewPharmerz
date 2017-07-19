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
import javax.persistence.Lob;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

/**
 *
 * @author ankur
 */
@Entity
@Table(name = "UNIT_OF_MEASUREMENTS")
@NamedQueries({
    @NamedQuery(name = "UnitOfMeasurement.findAll", query = "SELECT u FROM UnitOfMeasurement u")})
public class UnitOfMeasurement extends Domain implements Serializable {

    private static final long serialVersionUID = 1L;
    @Basic(optional = false)
    @Column(name = "UOM", nullable = false, length = 32)
    private String uom;
    @Column(name = "DESCRIPTION", length = 128)
    private String description;

    public UnitOfMeasurement() {
    }

    public String getUom() {
        return uom;
    }

    public void setUom(String uom) {
        this.uom = uom;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
