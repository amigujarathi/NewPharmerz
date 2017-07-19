package com.pharmerz.server.domain.repository;

import java.util.Date;

/**
 * Created by Amit on 18-04-2017.
 */
public interface DomainData {

    Boolean getDeleted();
    Date getCreated();
    Date getUpdated();
    String getCreatedBy();
    String getUpdatedBy();

}
