package com.pharmerz.server.domain.model.projection;

import com.pharmerz.server.domain.model.Product;
import org.springframework.data.rest.core.config.Projection;

/**
 * Created by ankur on 24-12-2016.
 */
@Projection(name = "summary", types = Product.class)
public interface IdentityProjection {
    String getType();
}
