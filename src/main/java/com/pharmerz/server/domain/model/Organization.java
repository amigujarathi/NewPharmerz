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
@Table(name = "ORGANIZATIONS", uniqueConstraints = {
    @UniqueConstraint(columnNames = {"USER_ID"})})
@NamedQueries({
    @NamedQuery(name = "Organization.findAll", query = "SELECT o FROM Organization o")})
public class Organization extends Domain implements Serializable {

    private static final long serialVersionUID = 1L;
    @Basic(optional = false)
    @Column(name = "ORGANIZATION", nullable = false, length = 256)
    private String organization;

    @Column(name = "WEBSITE")
    private String website;


    public String getWebsite() {
        return website;
    }

    public void setWebsite(String website) {
        this.website = website;
    }

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "organization")
    private List<Location> locations;
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "senderOrganization")
    private List<PurchaseOrder> sendPurchaseOrders;
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "receiverOrganization")
    private List<PurchaseOrder> receivedPurchaseOrders;
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "organization")
    private List<Purchaser> purchasing;
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "senderOrganization")
    private List<Quotation> sendQuotations;
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "receiverOrganization")
    private List<Quotation> receivedQuotations;
    @JoinColumn(name = "USER_ID", referencedColumnName = "ID", nullable = false)
    @OneToOne(optional = false)
    private User user;
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "senderOrganization")
    private List<Enquiry> sendEnquiries;
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "receiverOrganization")
    private List<Enquiry> receivedEnquiries;
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "organization")
    private List<Supplier> supplying;
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "senderOrganization")
    private List<Invoice> sendInvoices;
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "receiverOrganization")
    private List<Invoice> receivedInvoices;

    public Organization() {
    }


    public String getOrganization() {
        return organization;
    }

    public void setOrganization(String organization) {
        this.organization = organization;
    }


    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public List<Location> getLocations() {
        return locations;
    }

    public void setLocations(List<Location> locations) {
        this.locations = locations;
    }

    public List<PurchaseOrder> getSendPurchaseOrders() {
        return sendPurchaseOrders;
    }

    public void setSendPurchaseOrders(List<PurchaseOrder> sendPurchaseOrders) {
        this.sendPurchaseOrders = sendPurchaseOrders;
    }

    public List<PurchaseOrder> getReceivedPurchaseOrders() {
        return receivedPurchaseOrders;
    }

    public void setReceivedPurchaseOrders(List<PurchaseOrder> receivedPurchaseOrders) {
        this.receivedPurchaseOrders = receivedPurchaseOrders;
    }

    public List<Purchaser> getPurchasing() {
        return purchasing;
    }

    public void setPurchasing(List<Purchaser> purchasing) {
        this.purchasing = purchasing;
    }

    public List<Quotation> getSendQuotations() {
        return sendQuotations;
    }

    public void setSendQuotations(List<Quotation> sendQuotations) {
        this.sendQuotations = sendQuotations;
    }

    public List<Quotation> getReceivedQuotations() {
        return receivedQuotations;
    }

    public void setReceivedQuotations(List<Quotation> receivedQuotations) {
        this.receivedQuotations = receivedQuotations;
    }

    public List<Enquiry> getSendEnquiries() {
        return sendEnquiries;
    }

    public void setSendEnquiries(List<Enquiry> sendEnquiries) {
        this.sendEnquiries = sendEnquiries;
    }

    public List<Enquiry> getReceivedEnquiries() {
        return receivedEnquiries;
    }

    public void setReceivedEnquiries(List<Enquiry> receivedEnquiries) {
        this.receivedEnquiries = receivedEnquiries;
    }

    public List<Supplier> getSupplying() {
        return supplying;
    }

    public void setSupplying(List<Supplier> supplying) {
        this.supplying = supplying;
    }

    public List<Invoice> getSendInvoices() {
        return sendInvoices;
    }

    public void setSendInvoices(List<Invoice> sendInvoices) {
        this.sendInvoices = sendInvoices;
    }

    public List<Invoice> getReceivedInvoices() {
        return receivedInvoices;
    }

    public void setReceivedInvoices(List<Invoice> receivedInvoices) {
        this.receivedInvoices = receivedInvoices;
    }

    @OneToMany(mappedBy = "organization")
    private List<Tax> taxes;


    public List<Tax> getTaxes() {
        return taxes;
    }

    public void setTaxes(List<Tax> taxes) {
        this.taxes = taxes;
    }

    @OneToMany(mappedBy = "organization")
    private List<Identity> identities;


    public List<Identity> getIdentities() {
        return identities;
    }

    public void setIdentities(List<Identity> identities) {
        this.identities = identities;
    }



}
