package com.pharmerz.service;


import com.pharmerz.server.domain.model.Emails;

import java.util.Collection;
import java.util.UUID;

/**
 * Created by Amit on 17-01-2017.
 */
public interface EmailService {


    Collection<Emails> findall();

    Emails findone(UUID id);

    Emails create(Emails emails);

    Emails update(Emails emails);

    void delete(UUID id);


}
