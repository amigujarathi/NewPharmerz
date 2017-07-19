package com.pharmerz.service;


import com.pharmerz.server.domain.model.Emails;
import com.pharmerz.server.domain.repository.EmailsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.UUID;


/**
 * Created by Amit on 17-01-2017.
 */

@Service
public class EmailServiceImplementation implements EmailService {


    @Autowired
    public EmailsRepository emailsRepository;


    @Override
    public Collection<Emails> findall() {
        Collection<Emails> emailss = emailsRepository.findAll();
        return emailss;
    }


    @Override
    public Emails findone(UUID id) {
        Emails emails = emailsRepository.getOne(id);
        return null;
    }


    @Override
    public Emails create(Emails emails) {
        Emails savedEmails = emailsRepository.save(emails);
        return savedEmails;
    }


    @Override
    public Emails update(Emails emails) {
//        Emails emailsPersisted=findone(emails.);
//        if(emailsPersisted==null){
//            return null;
//        }
//        Emails updateEmails=emailsRepository.save( emails );

        return emails;
    }


    @Override
    public void delete(UUID id) {
        emailsRepository.delete(id);

    }


}
