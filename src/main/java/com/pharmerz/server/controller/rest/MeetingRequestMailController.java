package com.pharmerz.server.controller.rest;

import com.pharmerz.Appcations.Email;
import com.pharmerz.Appcations.MeetingRequestTemplate;
import com.pharmerz.server.domain.model.Meetingrequest;
import com.pharmerz.server.domain.repository.MeetingRequestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

//import com.pharmerz.server.domain.model.IphexContactus;

/**
 * Created by Amit on 08-05-2017.
 */
@RestController
@RequestMapping("/api/v1")
public class MeetingRequestMailController {

    @Autowired
    MeetingRequestRepository meetingRequestRepository;
    Email email = new Email();

    @PostMapping(value = "/meetingrequest")
    public ResponseEntity<Meetingrequest> sendmail(@RequestBody Meetingrequest meetingrequest) {

        String from = meetingrequest.getSender();
        String to = meetingrequest.getEmailto();
        String subject = meetingrequest.getSubject();
        String message = meetingrequest.getBody();


        MeetingRequestTemplate meetingRequestTemplate = new MeetingRequestTemplate();
        String body = meetingRequestTemplate.MeetingRequest(from, message);
        email.SendMail(to, subject, body);

        meetingRequestRepository.save(meetingrequest);
        return new ResponseEntity<Meetingrequest>(meetingrequest, HttpStatus.CREATED);
    }

}
