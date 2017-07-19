package com.pharmerz.service;

import com.pharmerz.server.domain.model.Contactus;

import java.util.Collection;

/**
 * Created by Amit on 14-01-2017.
 */
public interface ContactusService {

    Collection<Contactus> findall();

    Contactus findone();

    Contactus create(Contactus contactus);

    Contactus update(Contactus contactus);

    void delete(int id);
}


