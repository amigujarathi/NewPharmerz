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
@Table(name = "INVOICES", uniqueConstraints = {
    @UniqueConstraint(columnNames = {"PURCHASE_ORDER_ID"})})
@NamedQueries({
    @NamedQuery(name = "Invoice.findAll", query = "SELECT i FROM Invoice i")})
public class Invoice extends Domain implements Serializable {

    private static final long serialVersionUID = 1L;
    @Basic(optional = false)
    @Column(name = "RATE", nullable = false)
    private BigDecimal rate;
    @Basic(optional = false)
    @Column(name = "QUANTITY", nullable = false)
    private BigDecimal quantity;
    @Basic(optional = false)
    @Column(name = "FRIEGHT_AMOUNT", nullable = false)
    private BigDecimal frieghtAmount;
    @Column(name = "PAYMENT_TERMS", length = 128)
    private String paymentTerms;
    @Basic(optional = false)
    @Column(name = "INVOICE_DATE", nullable = false)
    @Temporal(TemporalType.TIMESTAMP)
    private Date invoiceDate;
    @Basic(optional = false)
    @Column(name = "ISSUE_DATE", nullable = false)
    @Temporal(TemporalType.TIMESTAMP)
    private Date issueDate;
    @Basic(optional = false)
    @Column(name = "PAYMENT_DUE_DATE", nullable = false)
    @Temporal(TemporalType.TIMESTAMP)
    private Date paymentDueDate;
    @Column(name = "TAX", length = 32)
    private String tax;
    @Column(name = "TAX_RATE", precision = 18, scale = 2)
    private BigDecimal taxRate;
    @JoinColumn(name = "CURRENCY_ID", referencedColumnName = "ID", nullable = false)
    @ManyToOne(optional = false)
    private Country country;
    @JoinColumn(name = "RECEIVER_ORGANIZATION_ID", referencedColumnName = "ID", nullable = false)
    @ManyToOne(optional = false)
    private Organization senderOrganization;
    @JoinColumn(name = "SENDER_ORGANIZATION_ID", referencedColumnName = "ID", nullable = false)
    @ManyToOne(optional = false)
    private Organization receiverOrganization;
    @JoinColumn(name = "PURCHASE_ORDER_ID", referencedColumnName = "ID", nullable = false)
    @OneToOne(optional = false)
    private PurchaseOrder purchaseOrder;
    @JoinColumn(name = "SUPPLIER_ID", referencedColumnName = "ID", nullable = false)
    @ManyToOne(optional = false)
    private Supplier supplier;


    @JoinColumn(name = "UNIT_OF_MEASUREMENT_ID", referencedColumnName = "ID", nullable = false)
    @ManyToOne(optional = false)
    private UnitOfMeasurement unitOfMeasurement;

    public UnitOfMeasurement getUnitOfMeasurement() {
        return unitOfMeasurement;
    }

    public void setUnitOfMeasurement(UnitOfMeasurement unitOfMeasurement) {
        this.unitOfMeasurement = unitOfMeasurement;
    }

    public Invoice() {
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

    public BigDecimal getFrieghtAmount() {
        return frieghtAmount;
    }

    public void setFrieghtAmount(BigDecimal frieghtAmount) {
        this.frieghtAmount = frieghtAmount;
    }

    public String getPaymentTerms() {
        return paymentTerms;
    }

    public void setPaymentTerms(String paymentTerms) {
        this.paymentTerms = paymentTerms;
    }

    public Date getInvoiceDate() {
        return invoiceDate;
    }

    public void setInvoiceDate(Date invoiceDate) {
        this.invoiceDate = invoiceDate;
    }

    public Date getIssueDate() {
        return issueDate;
    }

    public void setIssueDate(Date issueDate) {
        this.issueDate = issueDate;
    }

    public Date getPaymentDueDate() {
        return paymentDueDate;
    }

    public void setPaymentDueDate(Date paymentDueDate) {
        this.paymentDueDate = paymentDueDate;
    }

    public String getTax() {
        return tax;
    }

    public void setTax(String tax) {
        this.tax = tax;
    }

    public BigDecimal getTaxRate() {
        return taxRate;
    }

    public void setTaxRate(BigDecimal taxRate) {
        this.taxRate = taxRate;
    }


    public PurchaseOrder getPurchaseOrder() {
        return purchaseOrder;
    }

    public void setPurchaseOrder(PurchaseOrder purchaseOrder) {
        this.purchaseOrder = purchaseOrder;
    }

    public Supplier getSupplier() {
        return supplier;
    }

    public void setSupplier(Supplier supplier) {
        this.supplier = supplier;
    }


    public Country getCountry() {
        return country;
    }

    public void setCountry(Country country) {
        this.country = country;
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

    @Column(name = "INCOTERM", nullable = false)
    private String incoterm;

    public String getIncoterm() {
        return incoterm;
    }

    public void setIncoterm(String incoterm) {
        this.incoterm = incoterm;
    }

}
