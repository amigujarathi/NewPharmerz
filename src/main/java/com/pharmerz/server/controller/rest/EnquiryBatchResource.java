package com.pharmerz.server.controller.rest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.*;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.net.URI;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

/**
 * Created by ankur on 08-01-2017.
 */
@RestController
@RequestMapping("/enquiryBatches")
public class EnquiryBatchResource {

    @Autowired
    private RestTemplate restTemplate;


    @PostMapping
    @Async
    public ResponseEntity<?> postEnquiryBatach(@CookieValue("JSESSIONID") String jsessionId, @RequestBody Map<String, Object> enquiries) {

        if (enquiries.containsKey("suppliers") && enquiries.containsKey("receiverOrganizations")) {
            List<String> suppliers = (List) enquiries.get("suppliers");
            List<String> receiverOrganizations  = (List) enquiries.get("receiverOrganizations");
            enquiries.remove("suppliers");
            enquiries.remove("receiverOrganizations");

            if(suppliers != null && receiverOrganizations != null){
                if(suppliers.size() == receiverOrganizations.size()){
                    for(int i=0; i <suppliers.size(); i++){
                        enquiries.put("supplier", suppliers.get(i));
                        enquiries.put("receiverOrganization", receiverOrganizations.get(i));
                        RequestEntity<?> requestEntity = RequestEntity.post(URI.create("http://localhost:8080/PharmerzWeb/api/v1/enquiries"))
                                .header("Cookie", "JSESSIONID=" + jsessionId)
                                .header("Content-Type", "application/json")
                                .header("Accept", "application/json")
                                .body(enquiries);
                        try {
                            restTemplate.exchange(requestEntity, Void.class);
                        } catch (Exception ex) {
                            System.out.print(ex);
                        }


                    }
                }
            }

        }

        return ResponseEntity.ok().build();
    }

}




/*
        //HttpHeaders headers = new HttpHeaders();
        //headers.add("Cookie", "JSESSIONID=" + jsessionId);
        RequestEntity<?> requestEntity = RequestEntity.get(URI.create("http://localhost:8080/api/v1")).header("Cookie", "JSESSIONID=" + jsessionId).build();
        //HttpEntity<?> httpEntity = new HttpEntity(headers);

        //ResponseEntity<String> responseEntity = restTemplate.exchange("http://localhost:8080/api/v1", HttpMethod.GET, httpEntity, String.class);

        ResponseEntity<String> responseEntity = restTemplate.exchange(requestEntity, String.class);

        return responseEntity.getBody(); */





