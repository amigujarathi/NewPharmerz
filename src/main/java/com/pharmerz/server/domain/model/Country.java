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
@Table(name = "COUNTRIES")
@NamedQueries({
    @NamedQuery(name = "Country.findAll", query = "SELECT c FROM Country c")})
public class Country extends Domain implements Serializable {

    private static final long serialVersionUID = 1L;
    @Basic(optional = false)
    @Column(name = "COUNTRY", nullable = false)
    private String country;
    @Basic(optional = false)
    @Column(name = "ISO3", nullable = false)
    private String iso3;
    @Column(name = "CURRENCY")
    private String currency;
    @Basic(optional = false)
    @Column(name = "PHONE", nullable = false)
    private String phone;
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "country")
    private List<Location> locations;
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "country")
    private List<Enquiry> enquiries;
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "country")
    private List<Invoice> invoices;

    public Country() {
    }


    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public String getIso3() {
        return iso3;
    }

    public void setIso3(String iso3) {
        this.iso3 = iso3;
    }

    public String getCurrency() {
        return currency;
    }

    public void setCurrency(String currency) {
        this.currency = currency;
    }


    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public List<Location> getLocations() {
        return locations;
    }

    public void setLocations(List<Location> locations) {
        this.locations = locations;
    }

    public List<Enquiry> getEnquiries() {
        return enquiries;
    }

    public void setEnquiries(List<Enquiry> enquiries) {
        this.enquiries = enquiries;
    }

    public List<Invoice> getInvoices() {
        return invoices;
    }

    public void setInvoices(List<Invoice> invoices) {
        this.invoices = invoices;
    }
}
