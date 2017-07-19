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
@Projection(name = "detail", types = Quotation.class)
public interface QuotationProjection extends DomainData {
    String getIncoterm();
    BigDecimal getQuantity();
    String getMessage();
    String getStatus();
    @Value("#{target.getEnquiry().getCountry().getCurrency()}")
    String getCurrency();
    @Value("#{target.getEnquiry().getLocation()}")
    Location getLocation();
    @Value("#{target.getEnquiry().getLocation().getCountry().getCountry()}")
    String getCountry();
    Organization getSenderOrganization();
    @Value("#{target.getEnquiry().getSupplier().getProduct()}")
    Product getProduct();
    @Value("#{target.getEnquiry().getUnitOfMeasurement()}")
    UnitOfMeasurement getUnitOfMeasurement();
    BigDecimal getRate();
    String getPaymentTerms();
    String getLeadTime();
    String getTax();
    BigDecimal getTaxRate();
    Date getOfferValidity();
    Organization getReceiverOrganization();
    @Value("#{target.getEnquiry().getSupplier().getProduct().getCategory()}")
    Category getCategory();
    String getFrieghtType();
    String getPackaging();
    String getPackagingSpecial();
    String getPaymentTermsOther();
    UUID getId();


    //@Value("#{target.getEnquiry().getShipmentBy()}")
    String getShipmentBy();

    String getQuotaionlocation();
}
