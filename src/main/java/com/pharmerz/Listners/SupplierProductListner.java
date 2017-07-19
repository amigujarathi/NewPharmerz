//package com.pharmerz.Listners;
//
//import com.pharmerz.server.controller.exception.BadRequestException;
//import com.pharmerz.server.domain.model.Emails;
//import com.pharmerz.server.domain.model.Mobile;
//import com.pharmerz.server.domain.model.Supplier;
//import com.pharmerz.server.domain.repository.EmailsRepository;
//import com.pharmerz.server.domain.repository.MobileRepository;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.data.rest.core.annotation.HandleBeforeCreate;
//import org.springframework.data.rest.core.annotation.RepositoryEventHandler;
//import org.springframework.stereotype.Component;
//
//import java.util.UUID;
//
///**
// * Created by Amit on 27-06-2017.
// *
// * Functionality :- To check weather the user is verified or not before adding to suppliers table
// */
//
//@Component
//@RepositoryEventHandler(Supplier.class)
//public class SupplierProductListner {
//
//    @Autowired
//    EmailsRepository emailsRepository;
//    @Autowired
//    MobileRepository mobileRepository;
//
//    @HandleBeforeCreate
//    public void verifyUser(Supplier supplier) {
//
//        UUID userid = supplier.getOrganization().getUser().getId();
//        System.out.println(userid);
//        String useridStr = userid.toString().toUpperCase().replace("-", "");
//        System.out.println(useridStr);
//
//        Mobile userMobile = mobileRepository.findByUserid(useridStr);
//        System.out.println(userMobile);
//        Emails userEmails = emailsRepository.findByUserid(useridStr);
//        System.out.println(userEmails);
//
//        if (userEmails == null || userMobile == null) {
//            System.out.println("Null mobile or Email entity");
//            throw new BadRequestException("Null mobile or Email entity");
//        } else if (userEmails.getVERIFIED() == 0 || userMobile.getVERIFIED() == 0) {
//            System.out.println("user have unverified email or mobile");
//            throw new BadRequestException("Null mobile or Email entity");
//        } else {
//            System.out.println("verified email and mobile");
//        }
//
//    }
//}
