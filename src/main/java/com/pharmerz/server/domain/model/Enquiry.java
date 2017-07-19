/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.pharmerz.server.domain.model;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Date;
import javax.persistence.Basic;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.Lob;
import javax.persistence.ManyToOne;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

/**
 *
 * @author ankur
 */
@Entity
@Table(name = "ENQUIRIES")
@NamedQueries({
    @NamedQuery(name = "Enquiry.findAll", query = "SELECT e FROM Enquiry e")})
public class Enquiry extends Domain implements Serializable {

    private static final long serialVersionUID = 1L;
    @Basic(optional = false)
    @Column(name = "QUANTITY", nullable = false)
    private BigDecimal quantity;
    @Basic(optional = false)
    @Column(name = "SHIPMENT_BY", nullable = false)
    private String shipmentBy;
    @Column(name = "MESSAGE")
    private String message;
    @Basic(optional = false)
    @Column(name = "STATUS", nullable = false)
    private String status;
    @Column(name = "ENQUIRY_LOCATION",nullable = false)
    private String enquirylocation;
    @OneToOne(cascade = CascadeType.ALL, mappedBy = "enquiry")
    private Quotation quotation;
    @JoinColumn(name = "CURRENCY_ID", referencedColumnName = "ID", nullable = false)
    @ManyToOne(optional = false)
    private Country country;
    @JoinColumn(name = "UNIT_OF_MEASUREMENT_ID", referencedColumnName = "ID", nullable = false)
    @ManyToOne(optional = false)
    private UnitOfMeasurement unitOfMeasurement;
    @JoinColumn(name = "LOCATION_ID", referencedColumnName = "ID", nullable = false)
    @ManyToOne(optional = false)
    private Location location;
    @JoinColumn(name = "RECEIVER_ORGANIZATION_ID", referencedColumnName = "ID", nullable = false)
    @ManyToOne(optional = false)
    private Organization receiverOrganization;
    @JoinColumn(name = "SENDER_ORGANIZATION_ID", referencedColumnName = "ID", nullable = false)
    @ManyToOne(optional = false)
    private Organization senderOrganization;
    @JoinColumn(name = "SUPPLIER_ID", referencedColumnName = "ID", nullable = false)
    @ManyToOne(optional = false)
    private Supplier supplier;

    public Enquiry() {
        status = "SENT";
    }


    @Column(name = "INCOTERM")
    private String incoterm;

    public String getIncoterm() {
        return incoterm;
    }

    public void setIncoterm(String incoterm) {
        this.incoterm = incoterm;
    }


    public BigDecimal getQuantity() {
        return quantity;
    }

    public void setQuantity(BigDecimal quantity) {
        this.quantity = quantity;
    }

    public String getShipmentBy() {
        return shipmentBy;
    }

    public void setShipmentBy(String shipmentBy) {
        this.shipmentBy = shipmentBy;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }


    public Quotation getQuotation() {
        return quotation;
    }

    public void setQuotation(Quotation quotation) {
        this.quotation = quotation;
    }

    public Country getCountry() {
        return country;
    }

    public void setCountry(Country country) {
        this.country = country;
    }


    public Location getLocation() {
        return location;
    }

    public void setLocation(Location location) {
        this.location = location;
    }



    public Organization getSenderOrganization() {
        return senderOrganization;
    }

    public void setSenderOrganization(Organization senderOrganization) {
        this.senderOrganization = senderOrganization;
    }

    public Supplier getSupplier() {
        return supplier;
    }

    public void setSupplier(Supplier supplier) {
        this.supplier = supplier;
    }

    public UnitOfMeasurement getUnitOfMeasurement() {
        return unitOfMeasurement;
    }

    public void setUnitOfMeasurement(UnitOfMeasurement unitOfMeasurement) {
        this.unitOfMeasurement = unitOfMeasurement;
    }


    public Organization getReceiverOrganization() {
        return receiverOrganization;
    }

    public void setReceiverOrganization(Organization receiverOrganization) {
        this.receiverOrganization = receiverOrganization;
    }

    public String getEnquirylocation() {
        return enquirylocation;
    }

    public void setEnquirylocation(String enquirylocation) {
        this.enquirylocation = enquirylocation;
    }
}
