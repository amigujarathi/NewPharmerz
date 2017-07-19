package com.pharmerz.server.domain.model.projection;

import com.pharmerz.server.domain.model.*;
import com.pharmerz.server.domain.repository.DomainData;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.rest.core.config.Projection;

import java.util.List;
import java.util.UUID;

/**
 * Created by Amit on 02-05-2017.
 */
@Projection(name = "detail", types = User.class)
public interface UserProjection extends DomainData{

    UUID getId();
    String getUsername();

   // Role getRole();
    String getLastName();
    String getMobile();
    String getFirstName();
    String getEmail();



    Organization getOrganization();

   @Value("#{target.getOrganization().getLocations()}")
    List<Location> getLocations();
    List<UserRole> getUserRoles();
    @Value("#{target.getOrganization().getIdentities()}")
    List<Identity> getIdentities();



}
