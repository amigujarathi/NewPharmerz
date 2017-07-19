package com.pharmerz.server.domain.model.projection;

import com.pharmerz.server.domain.model.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.rest.core.config.Projection;

import java.math.BigDecimal;
import java.util.UUID;

/**
 * Created by ankur on 02-01-2017.
 */
@Projection(name = "detail", types = Location.class)
public interface LocationProjection {
    String getLocation();
    String getAddressLine1();
    String getAddressLine2();
    String getPostalCode();
    String getCity();
    String getRegion();
    Country getCountry();
    UUID getId();
    int getStatus();
}
