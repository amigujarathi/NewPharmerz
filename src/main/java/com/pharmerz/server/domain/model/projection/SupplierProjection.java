package com.pharmerz.server.domain.model.projection;

import com.pharmerz.server.domain.model.Organization;
import com.pharmerz.server.domain.model.Product;
import com.pharmerz.server.domain.model.Supplier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.rest.core.config.Projection;

/**
 * Created by ankur on 27-12-2016.
 */
@Projection(name = "detail", types = Supplier.class)
public interface SupplierProjection {
    Organization getOrganization();
    Product getProduct();
    String getSku();
    @Value("#{target.getProduct().getCategory().getCategory()}")
    String getCategory();
}
