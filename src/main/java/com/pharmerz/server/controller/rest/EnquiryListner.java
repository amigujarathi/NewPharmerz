package com.pharmerz.server.controller.rest;

import com.pharmerz.server.controller.exception.BadRequestException;
import com.pharmerz.server.domain.model.Emails;
import com.pharmerz.server.domain.model.Enquiry;
import com.pharmerz.server.domain.model.Mobile;
import com.pharmerz.server.domain.repository.EmailsRepository;
import com.pharmerz.server.domain.repository.MobileRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.core.annotation.HandleBeforeCreate;
import org.springframework.data.rest.core.annotation.RepositoryEventHandler;
import org.springframework.stereotype.Component;

import java.util.UUID;

/**
 * Created by Amit on 31-05-2017.
 */
@Component
@RepositoryEventHandler(Enquiry.class)
public class EnquiryListner {

    @Autowired
    EmailsRepository emailsRepository;
    @Autowired
    MobileRepository mobileRepository;

    @HandleBeforeCreate
    public void handler(Enquiry enquiry) {

        System.out.println("in handler");
        UUID user = enquiry.getSenderOrganization().getUser().getId();
        System.out.println("user " + user);

        String userid = user.toString().toString().replace("-", "").toUpperCase();
        System.out.println("userid " + userid);

        Emails emails = emailsRepository.findByUserid(userid);
        System.out.println("emails " + emails);
        Mobile mobile=mobileRepository.findByUserid(userid);
        System.out.println("mobile "+mobile);
        if (emailsRepository.findByUserid(userid) == null || emailsRepository.findByUserid(userid).getVERIFIED() == 0) {
            System.out.println("email object null or unverified");
			//throw new BadRequestException("Email not verified",HttpStatus.BAD_REQUEST);
            throw new BadRequestException("Email not verified");
        }
        if (mobileRepository.findByUserid(userid) == null || mobileRepository.findByUserid(userid).getVERIFIED() == 0) {
            System.out.println("mobile object null or unverified");
            throw new BadRequestException("Mobile not verified");
        }
        System.out.println("Enquiry listner ends");

    }
}
