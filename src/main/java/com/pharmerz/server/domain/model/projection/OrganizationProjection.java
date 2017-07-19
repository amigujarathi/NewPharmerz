package com.pharmerz.server.domain.model.projection;

import com.pharmerz.server.domain.model.Organization;
import org.springframework.data.rest.core.config.Projection;

import java.util.UUID;

/**
 * Created by Amit on 29-06-2017.
 */

@Projection(name = "detail", types = Organization.class)
public interface OrganizationProjection {

    UUID getId();
    String getOrganization();
}
