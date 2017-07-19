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
import javax.persistence.UniqueConstraint;

/**
 *
 * @author ankur
 */
@Entity
@Table(name = "QUOTATIONS", uniqueConstraints = {
    @UniqueConstraint(columnNames = {"ENQUIRY_ID"})})
@NamedQueries({
    @NamedQuery(name = "Quotation.findAll", query = "SELECT q FROM Quotation q")})
public class Quotation extends Domain implements Serializable {

    private static final long serialVersionUID = 1L;
    @Basic(optional = false)
    @Column(name = "RATE", nullable = false)
    private BigDecimal rate;
    @Basic(optional = false)
    @Column(name = "QUANTITY", nullable = false)
    private BigDecimal quantity;
    @Column(name = "PAYMENT_TERMS")
    private String paymentTerms;
    @Column(name = "LEAD_TIME")
    private String leadTime;
    @Basic(optional = false)
    @Column(name = "TAX", nullable = false)
    private String tax;
    @Column(name = "QUOTATION_LOCATION",nullable = false)
    private String quotaionlocation;
    //code added by amit
    @Basic(optional = false)
    @Column(name = "SHIPMENT_BY", nullable = false)
    private String shipmentBy;
    @Basic(optional = false)
    @Column(name = "TAX_RATE", nullable = false)
    private BigDecimal taxRate;
    @Column(name = "OFFER_VALIDITY")
    @Temporal(TemporalType.TIMESTAMP)
    private Date offerValidity;
    @Column(name = "MESSAGE")
    private String message;
    @OneToOne(cascade = CascadeType.ALL, mappedBy = "quotation")
    private PurchaseOrder purchaseOrder;
    @JoinColumn(name = "ENQUIRY_ID", referencedColumnName = "ID", nullable = false)
    @OneToOne(optional = false)
    private Enquiry enquiry;


    @JoinColumn(name = "RECEIVER_ORGANIZATION_ID", referencedColumnName = "ID", nullable = false)
    @ManyToOne(optional = false)
    private Organization receiverOrganization;
    @JoinColumn(name = "SENDER_ORGANIZATION_ID", referencedColumnName = "ID", nullable = false)
    @ManyToOne(optional = false)
    private Organization senderOrganization;


    @Column(name = "STATUS", nullable = false)
    private String status;


    @Column(name = "PACKAGING_SPECIAL")
    private String packagingSpecial;

    @Column(name ="PAYMENT_TERMS_OTHER")
    private String paymentTermsOther;


    public String getPaymentTermsOther() {
        return paymentTermsOther;
    }

    public void setPaymentTermsOther(String paymentTermsOther) {
        this.paymentTermsOther = paymentTermsOther;
    }

    public String getPackagingSpecial() {
        return packagingSpecial;
    }

    public void setPackagingSpecial(String packagingSpecial) {
        this.packagingSpecial = packagingSpecial;
    }

    public Quotation() {
        status = "SENT";
        packaging = "STANDARD";
        frieghtType = "PAID";
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public BigDecimal getRate() {
        return rate;
    }

    public void setRate(BigDecimal rate) {
        this.rate = rate;
    }

    public BigDecimal getQuantity() {
        return quantity;
    }

    public void setQuantity(BigDecimal quantity) {
        this.quantity = quantity;
    }

    public String getPaymentTerms() {
        return paymentTerms;
    }

    public void setPaymentTerms(String paymentTerms) {
        this.paymentTerms = paymentTerms;
    }

    public String getLeadTime() {
        return leadTime;
    }

    public void setLeadTime(String leadTime) {
        this.leadTime = leadTime;
    }

    public String getTax() {
        return tax;
    }

    public void setTax(String tax) {
        this.tax = tax;
    }

    public String getShipmentBy() {
        return shipmentBy;
    }

    public void setShipmentBy(String shipmentBy) {
        this.shipmentBy = shipmentBy;
    }

    public BigDecimal getTaxRate() {
        return taxRate;
    }

    public void setTaxRate(BigDecimal taxRate) {
        this.taxRate = taxRate;
    }

    public Date getOfferValidity() {
        return offerValidity;
    }

    public void setOfferValidity(Date offerValidity) {
        this.offerValidity = offerValidity;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    @Column(name = "FRIEGHT_TYPE")
    private String frieghtType;


    public String getFrieghtType() {
        return frieghtType;
    }

    @Column(name = "PACKAGING")
    private String packaging;

    public String getPackaging() {
        return packaging;
    }

    public void setPackaging(String packaging) {
        this.packaging = packaging;
    }

    public void setFrieghtType(String frieghtType) {
        this.frieghtType = frieghtType;
    }

    public PurchaseOrder getPurchaseOrder() {
        return purchaseOrder;
    }

    public void setPurchaseOrder(PurchaseOrder purchaseOrder) {
        this.purchaseOrder = purchaseOrder;
    }

    public Enquiry getEnquiry() {
        return enquiry;
    }

    public void setEnquiry(Enquiry enquiry) {
        this.enquiry = enquiry;
    }



    @Column(name = "INCOTERM")
    private String incoterm;

    public String getIncoterm() {
        return incoterm;
    }

    public void setIncoterm(String incoterm) {
        this.incoterm = incoterm;
    }



    public Organization getReceiverOrganization() {
        return receiverOrganization;
    }

    public void setReceiverOrganization(Organization receiverOrganization) {
        this.receiverOrganization = receiverOrganization;
    }

    public Organization getSenderOrganization() {
        return senderOrganization;
    }

    public void setSenderOrganization(Organization senderOrganization) {
        this.senderOrganization = senderOrganization;
    }

    public String getQuotaionlocation() {
        return quotaionlocation;
    }

    public void setQuotaionlocation(String quotaionlocation) {
        this.quotaionlocation = quotaionlocation;
    }
}
