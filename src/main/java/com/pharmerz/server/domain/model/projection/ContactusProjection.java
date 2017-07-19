package com.pharmerz.server.domain.model.projection;

import com.pharmerz.server.domain.model.Contactus;
import com.pharmerz.server.domain.repository.DomainData;
import org.springframework.data.rest.core.config.Projection;

/**
 * Created by User on 28-04-2017.
 */
@Projection(name = "detail", types = Contactus.class)
public interface ContactusProjection extends DomainData{

    String getFULL_NAME();
    String getCOMPANY_NAME();
    String getCONTACT_NUMBER();
}
