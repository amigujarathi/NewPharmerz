package com.pharmerz.service;

import com.pharmerz.server.domain.model.Mobile;

import java.util.Collection;
import java.util.UUID;

/**
 * Created Amit i5 on 1/14/2017.
 */
public interface MobilesService {

    Collection<Mobile> findall();

    Mobile findone(UUID id);

    Mobile create(Mobile mobile);

    Mobile update(Mobile mobile);

    void delete(UUID id);


}


