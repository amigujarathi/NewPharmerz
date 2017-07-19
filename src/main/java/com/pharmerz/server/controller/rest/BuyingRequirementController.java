package com.pharmerz.server.controller.rest;

import com.pharmerz.Appcations.BuyerRequirementTemplate;
import com.pharmerz.Appcations.Email;
import com.pharmerz.server.domain.model.BuyingRequirement;
import com.pharmerz.server.domain.repository.IBuyingRequirementsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * Created by Amit on 07-06-2017.
 */
@RestController
@RequestMapping("/api/v1")
public class BuyingRequirementController {

    @Autowired
    IBuyingRequirementsRepository iBuyingRequirementsRepository;
    Email email = new Email();

    BuyerRequirementTemplate buyerRequirementTemplate = new BuyerRequirementTemplate();

    private String To = "support@pharmerz.com";
    // private String To = "amigujarathi@gmail.com";
    private String Subject = "Buyer Request From Pharmerz ";

    @PostMapping(value = "/buyingRequirement")
    public ResponseEntity<BuyingRequirement> CreateBuyingRequirement(@RequestBody BuyingRequirement buyingRequirements) {

        String productname = buyingRequirements.getProductname();
        String name = buyingRequirements.getName();
        String mobile = buyingRequirements.getMobile();
        String emails = buyingRequirements.getEmail();
        String city = buyingRequirements.getCity();
        if (city == null) {
            city = "-";
        }

        String HTMLBODY = buyerRequirementTemplate.template(productname, name, emails, mobile, city);

        email.SendMail(To, Subject, HTMLBODY);


        iBuyingRequirementsRepository.save(buyingRequirements);
        return new ResponseEntity<BuyingRequirement>(buyingRequirements, HttpStatus.CREATED);
    }


    @GetMapping(value = "/buyingRequirements")
    public Page<BuyingRequirement> getAllBuyingRequirements(Pageable pageable) {

        Page requirements = iBuyingRequirementsRepository.findAllByOrderByCreatedDesc(pageable);
        return requirements;
    }

    @GetMapping(value = "/buyingRequirmentByName/{name}")
    public Page<BuyingRequirement> getByName(@PathVariable String name,Pageable pageable){
        Page buyersByName = iBuyingRequirementsRepository.findByNameContainingIgnoreCase(name,pageable);

        return buyersByName;
    }
}