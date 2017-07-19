package com.pharmerz.server.domain.model.projection;

import com.pharmerz.server.domain.model.*;
import com.pharmerz.server.domain.repository.DomainData;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.rest.core.config.Projection;

import java.math.BigDecimal;
import java.util.UUID;

/**
 * Created by ankur on 02-01-2017.
 */
@Projection(name = "detail", types = Enquiry.class)
public interface EnquiryProjection extends DomainData {
    String getIncoterm();
    BigDecimal getQuantity();
    String getShipmentBy();
    String getMessage();
    String getStatus();
    @Value("#{target.getCountry().getCurrency()}")
    String getCurrency();
    Location getLocation();
    @Value("#{target.getLocation().getCountry().getCountry()}")
    String getCountry();
    Organization getSenderOrganization();
    @Value("#{target.getSupplier().getProduct()}")
    Product getProduct();
    UnitOfMeasurement getUnitOfMeasurement();
    Organization getReceiverOrganization();
    @Value("#{target.getSupplier().getProduct().getCategory()}")
    Category getCategory();
    UUID getId();
    String getEnquirylocation();
}
