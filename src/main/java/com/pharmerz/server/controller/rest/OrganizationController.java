package com.pharmerz.server.controller.rest;

import com.pharmerz.server.domain.model.Organization;
import com.pharmerz.server.domain.model.SearchByOrganization;
import com.pharmerz.server.domain.repository.IOrganizationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

/**
 * Created by User on 29-06-2017.
 */

@RestController
@RequestMapping("/api/v1")
public class OrganizationController {
    @Autowired
    IOrganizationRepository iOrganizationRepository;


    @GetMapping(value = "/organizationSearch")
    public List<SearchByOrganization> getAllOrganizations() {

        List<Organization> organizations = iOrganizationRepository.findAllByOrderByOrganizationAsc();
        List<SearchByOrganization> searchByOrganizationList = new ArrayList<>();



        for (Organization organization : organizations) {
            SearchByOrganization searchByOrganization = new SearchByOrganization();
            searchByOrganization.setOrganization_id(organization.getId());
            searchByOrganization.setOrganization_name(organization.getOrganization());
            searchByOrganizationList.add(searchByOrganization);
        }

        searchByOrganizationList = Collections.synchronizedList(searchByOrganizationList);
        return searchByOrganizationList;
    }
}
