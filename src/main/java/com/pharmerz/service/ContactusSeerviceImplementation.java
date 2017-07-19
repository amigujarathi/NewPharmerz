package com.pharmerz.service;

import com.pharmerz.server.domain.model.Contactus;
import com.pharmerz.server.domain.repository.ContactusRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collection;

/**
 * Created by Amit on 14-01-2017.
 */
@Service
public class ContactusSeerviceImplementation implements ContactusService {


    @Autowired
    public ContactusRepository contactusRepository;

    @Override
    public Collection<Contactus> findall() {
        Collection<Contactus> contactuses = contactusRepository.findAll();
        System.out.println("***********************************");
        System.out.println("findallfrom service   " + contactuses.iterator());
        return contactuses;
    }

    @Override
    public Contactus findone() {
        Contactus contactus = contactusRepository.findOne(1);
        contactusRepository.findOne(1);
        System.out.println("***********************************");
        System.out.println("find one  fromservice  " + contactus.getFULL_NAME());
        return contactus;
    }

    @Override
    public Contactus create(Contactus contactus) {

        Contactus savedContact = contactusRepository.save(contactus);

        return savedContact;

    }


    @Override
    public Contactus update(Contactus contactus) {
//        Contactus contactusPersisted=findone(contactus.getId());
//        if(contactusPersisted==null){
//            return null;
//        }
//        Contactus updateContactus=contactusRepository.save( contactus );
//
//        return updateContactus;
        return contactus;
    }

    @Override
    public void delete(int id) {
        contactusRepository.delete(id);
    }


}



