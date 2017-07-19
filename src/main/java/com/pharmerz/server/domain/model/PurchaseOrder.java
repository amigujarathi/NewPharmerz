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
@Table(name = "PURCHASE_ORDERS", uniqueConstraints = {
    @UniqueConstraint(columnNames = {"QUOTATION_ID"})})
@NamedQueries({
    @NamedQuery(name = "PurchaseOrder.findAll", query = "SELECT p FROM PurchaseOrder p")})
public class PurchaseOrder extends Domain implements Serializable {

    private static final long serialVersionUID = 1L;
    @Basic(optional = false)
    @Column(name = "RATE", nullable = false)
    private BigDecimal rate;
    @Basic(optional = false)
    @Column(name = "QUANTITY", nullable = false)
    private BigDecimal quantity;
    @Basic(optional = false)
    @Column(name = "PAYMENT_TERMS", nullable = false)
    private String paymentTerms;
    @Basic(optional = false)
    @Column(name = "TAX", nullable = false)
    private String tax;
    //code added by amit
    @Basic(optional = false)
    @Column(name = "SHIPMENT_BY", nullable = false)
    private String shipmentBy;
    @Basic(optional = false)
    @Column(name = "TAX_RATE", nullable = false)
    private BigDecimal taxRate;
    @Basic(optional = false)
    @Column(name = "DELIVERY_SCHEDULE", nullable = false)
    @Temporal(TemporalType.TIMESTAMP)
    private Date deliverySchedule;
    @Column(name = "MESSAGE")
    private String message;
    @Basic(optional = false)
    @Column(name = "STATUS", nullable = false)
    private String status;
    @Basic(optional = false)
    @Column(name = "COMMERCIAL_INVOICE", nullable = false)
    private Boolean commercialInvoice;
    @Basic(optional = false)
    @Column(name = "PACKAGING_LIST", nullable = false)
    private Boolean packagingList;
    @Basic(optional = false)
    @Column(name = "NON_PREF_CERT_ORIGIN", nullable = false)
    private Boolean nonPrefCertOrigin;
    @Basic(optional = false)
    @Column(name = "BILL_OF_LADING", nullable = false)
    private Boolean billOfLading;
    @Basic(optional = false)
    @Column(name = "HEALTH_CERTIFICATE", nullable = false)
    private Boolean healthCertificate;
    @Basic(optional = false)
    @Column(name = "PREF_CERT_ORIGIN", nullable = false)
    private Boolean prefCertOrigin;
    @Basic(optional = false)
    @Column(name = "MANUFACTURING_CERT", nullable = false)
    private Boolean manufacturingCert;
    @Basic(optional = false)
    @Column(name = "CERT_ANALYSIS", nullable = false)
    private Boolean certAnalysis;
    @Basic(optional = false)
    @Column(name = "INSURANCE_POLICY", nullable = false)
    private Boolean insurancePolicy;
    @Basic(optional = false)
    @Column(name = "AIRWAY_BILL", nullable = false)
    private Boolean airwayBill;


    @JoinColumn(name = "SENDER_ORGANIZATION_ID", referencedColumnName = "ID", nullable = false)
    @ManyToOne(optional = false)
    private Organization senderOrganization;
    @JoinColumn(name = "RECEIVER_ORGANIZATION_ID", referencedColumnName = "ID", nullable = false)
    @ManyToOne(optional = false)
    private Organization receiverOrganization;
    @JoinColumn(name = "QUOTATION_ID", referencedColumnName = "ID", nullable = false)
    @OneToOne(optional = false)
    private Quotation quotation;

    @OneToOne(cascade = CascadeType.ALL, mappedBy = "purchaseOrder")
    private Invoice invoice;

    public PurchaseOrder() {
        commercialInvoice = false;
        packagingList = false;
        nonPrefCertOrigin = false;
        billOfLading = false;
        healthCertificate = false;
        prefCertOrigin = false;
        manufacturingCert = false;
        certAnalysis = false;
        insurancePolicy = false;
        airwayBill = false;
        status = "SENT";
        frieghtType = "PAID";
        others = false;

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

    public Date getDeliverySchedule() {
        return deliverySchedule;
    }

    public void setDeliverySchedule(Date deliverySchedule) {
        this.deliverySchedule = deliverySchedule;
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

    public Boolean getCommercialInvoice() {
        return commercialInvoice;
    }

    public void setCommercialInvoice(Boolean commercialInvoice) {
        this.commercialInvoice = commercialInvoice;
    }

    public Boolean getPackagingList() {
        return packagingList;
    }

    public void setPackagingList(Boolean packagingList) {
        this.packagingList = packagingList;
    }

    public Boolean getNonPrefCertOrigin() {
        return nonPrefCertOrigin;
    }

    public void setNonPrefCertOrigin(Boolean nonPrefCertOrigin) {
        this.nonPrefCertOrigin = nonPrefCertOrigin;
    }

    public Boolean getBillOfLading() {
        return billOfLading;
    }

    public void setBillOfLading(Boolean billOfLading) {
        this.billOfLading = billOfLading;
    }

    public Boolean getHealthCertificate() {
        return healthCertificate;
    }

    public void setHealthCertificate(Boolean healthCertificate) {
        this.healthCertificate = healthCertificate;
    }

    public Boolean getPrefCertOrigin() {
        return prefCertOrigin;
    }

    public void setPrefCertOrigin(Boolean prefCertOrigin) {
        this.prefCertOrigin = prefCertOrigin;
    }

    public Boolean getManufacturingCert() {
        return manufacturingCert;
    }

    public void setManufacturingCert(Boolean manufacturingCert) {
        this.manufacturingCert = manufacturingCert;
    }

    public Boolean getCertAnalysis() {
        return certAnalysis;
    }

    public void setCertAnalysis(Boolean certAnalysis) {
        this.certAnalysis = certAnalysis;
    }

    public Boolean getInsurancePolicy() {
        return insurancePolicy;
    }

    public void setInsurancePolicy(Boolean insurancePolicy) {
        this.insurancePolicy = insurancePolicy;
    }

    public Boolean getAirwayBill() {
        return airwayBill;
    }

    public void setAirwayBill(Boolean airwayBill) {
        this.airwayBill = airwayBill;
    }


    public Organization getSenderOrganization() {
        return senderOrganization;
    }

    public void setSenderOrganization(Organization senderOrganization) {
        this.senderOrganization = senderOrganization;
    }

    public Organization getReceiverOrganization() {
        return receiverOrganization;
    }

    public void setReceiverOrganization(Organization receiverOrganization) {
        this.receiverOrganization = receiverOrganization;
    }

    public Quotation getQuotation() {
        return quotation;
    }

    public void setQuotation(Quotation quotation) {
        this.quotation = quotation;
    }


    public Invoice getInvoice() {
        return invoice;
    }

    public void setInvoice(Invoice invoice) {
        this.invoice = invoice;
    }

    @Column(name = "INCOTERM")
    private String incoterm;

    public String getIncoterm() {
        return incoterm;
    }

    public void setIncoterm(String incoterm) {
        this.incoterm = incoterm;
    }


    @Column(name = "FRIEGHT_TYPE", nullable = false)
    private String frieghtType;

    public String getFrieghtType() {
        return frieghtType;
    }

    public void setFrieghtType(String frieghtType) {
        this.frieghtType = frieghtType;
    }

    @Column(name = "OTHERS", nullable = false)
    private Boolean others;

    public Boolean getOthers() {
        return others;
    }



    public void setOthers(Boolean others) {
        this.others = others;
    }

    @Column(name = "DOC_OTHERS")
    private String docOthers;


    public String getDocOthers() {
        return docOthers;
    }

    public void setDocOthers(String docOthers) {
        this.docOthers = docOthers;
    }
}