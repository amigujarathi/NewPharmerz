package com.pharmerz.server.domain.model.projection;

import com.pharmerz.server.domain.model.Product;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.rest.core.config.Projection;

import java.util.UUID;

/**
 * Created by ankur on 23-12-2016.
 */
@Projection(name = "detail", types = Product.class)
public interface ProductProjection {
    String getProduct();
    String getComposition();
    String getUpc();
    String getNote();
    String getUrl();
    @Value("#{target.getCategory().getCategory()}")
    String getCategoryName();
    UUID getId();
}
