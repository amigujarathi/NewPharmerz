/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.pharmerz.server.domain.model;

import java.io.Serializable;
import java.util.Date;
import java.util.List;
import javax.persistence.Basic;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Lob;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

/**
 *
 * @author ankur
 */
@Entity
@Table(name = "INCOTERMS")
@NamedQueries({
    @NamedQuery(name = "Incoterm.findAll", query = "SELECT i FROM Incoterm i")})
public class Incoterm extends Domain implements Serializable {

    private static final long serialVersionUID = 1L;
    @Basic(optional = false)
    @Column(name = "INCOTERM", nullable = false, length = 64)
    private String incoterm;
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "incoterm")
    private List<PurchaseOrder> purchaseOrders;
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "incoterm")
    private List<Quotation> quotations;
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "incoterm")
    private List<Enquiry> enquiries;

    public Incoterm() {
    }



    public String getIncoterm() {
        return incoterm;
    }

    public void setIncoterm(String incoterm) {
        this.incoterm = incoterm;
    }

    public List<PurchaseOrder> getPurchaseOrders() {
        return purchaseOrders;
    }

    public void setPurchaseOrders(List<PurchaseOrder> purchaseOrders) {
        this.purchaseOrders = purchaseOrders;
    }

    public List<Quotation> getQuotations() {
        return quotations;
    }

    public void setQuotations(List<Quotation> quotations) {
        this.quotations = quotations;
    }

    public List<Enquiry> getEnquiries() {
        return enquiries;
    }

    public void setEnquiries(List<Enquiry> enquiries) {
        this.enquiries = enquiries;
    }
}
