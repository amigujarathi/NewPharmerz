package com.pharmerz.server.domain.model.projection;

import com.pharmerz.server.domain.model.*;
import com.pharmerz.server.domain.repository.DomainData;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.rest.core.config.Projection;

import java.math.BigDecimal;
import java.util.Date;
import java.util.UUID;

/**
 * Created by ankur on 02-01-2017.
 */
@Projection(name = "detail", types = PurchaseOrder.class)
public interface PurchaseOrderProjection extends DomainData {
    String getIncoterm();
    BigDecimal getQuantity();
    //String getShipmentBy();
    String getMessage();
    String getStatus();
    @Value("#{target.getQuotation().getEnquiry().getCountry().getCurrency()}")
    String getCurrency();
    @Value("#{target.getQuotation().getEnquiry().getLocation()}")
    Location getLocation();
    @Value("#{target.getQuotation().getEnquiry().getLocation().getCountry().getCountry()}")
    String getCountry();
    Organization getSenderOrganization();
    @Value("#{target.getQuotation().getEnquiry().getSupplier().getProduct()}")
    Product getProduct();
    @Value("#{target.getQuotation().getEnquiry().getUnitOfMeasurement()}")
    UnitOfMeasurement getUnitOfMeasurement();
    BigDecimal getRate();
    String getPaymentTerms();
    //String getLeadTime();
    String getTax();
    BigDecimal getTaxRate();
    //Date getOfferValidity();
    Organization getReceiverOrganization();
    Date getDeliverySchedule();
    Boolean getCommercialInvoice();
    Boolean getPackagingList();
    Boolean getNonPrefCertOrigin();
    Boolean getBillOfLading();
    Boolean getHealthCertificate();
    Boolean getPrefCertOrigin();
    Boolean getManufacturingCert();
    Boolean getCertAnalysis();
    Boolean getInsurancePolicy();
    Boolean getAirwayBill();

    @Value("#{target.getQuotation().getEnquiry().getSupplier().getProduct().getCategory()}")
    Category getCategory();
    String getFrieghtType();

    Boolean getOthers();
    String getDocOthers();
    UUID getId();



    //@Value("#{target.getQuotation().getEnquiry().getShipmentBy()}")
    String getShipmentBy();
}
