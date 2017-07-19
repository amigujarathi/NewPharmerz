package com.pharmerz.server.domain.model;

import javax.persistence.Entity;
import java.util.UUID;

/**
 * Created by User on 29-06-2017.
 */

public class SearchByOrganization {


    private UUID organization_id;
    private String organization_name;

    public SearchByOrganization() {
    }

    public UUID getOrganization_id() {
        return organization_id;
    }

    public void setOrganization_id(UUID organization_id) {
        this.organization_id = organization_id;
    }

    public String getOrganization_name() {
        return organization_name;
    }

    public void setOrganization_name(String organization_name) {
        this.organization_name = organization_name;
    }
}
