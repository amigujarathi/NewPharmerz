package com.pharmerz.server.controller.rest;

import com.pharmerz.server.domain.model.CountByCategeory;
import com.pharmerz.server.domain.repository.IProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.UUID;

/**
 * Created by User on 10-04-2017.
 */

@RestController
@RequestMapping("/api/v1/")
public class ProductCountController {

    @Autowired
    IProductRepository iProductRepository;


    @GetMapping(value = "/productcount", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<CountByCategeory> getContactuss() {



        Long Herbals = iProductRepository.countByCategoryId(UUID.fromString("a26a62ff-82da-4f58-90c1-f4a973ac7ce1"));
        Long Pellets = iProductRepository.countByCategoryId(UUID.fromString("2e6bb91a-99a6-431a-b632-e9ae02d31f24"));
        Long FineChemicals = iProductRepository.countByCategoryId(UUID.fromString("57ea19be-a8c5-448a-a1a5-41e6a585faae"));
        Long IntermediatesExcipients = iProductRepository.countByCategoryId(UUID.fromString("b6517d2b-876a-4dfd-b62d-70130d680f94"));
        Long FinishedFormulation = iProductRepository.countByCategoryId(UUID.fromString("51df05c3-915b-4f70-8c3a-7709e1af6cad"));
        Long LabEquipment = iProductRepository.countByCategoryId(UUID.fromString("523e1faa-b091-4728-b0dc-dfd7d538c9b2"));
        Long Apis = iProductRepository.countByCategoryId(UUID.fromString("94ac00f8-4fd1-4e19-9f41-c0162bf69d47"));

        System.out.println("Herbals   "+Herbals);
        System.out.println("Pellets   "+Pellets);
        System.out.println("FineChemicals   "+FineChemicals);
        System.out.println("IntermediatesExcipients   "+IntermediatesExcipients);
        System.out.println("FinishedFormulation   "+FinishedFormulation);
        System.out.println("LabEquipment   "+LabEquipment);
        System.out.println("Apis   "+Apis);

        CountByCategeory countByCategeory=new CountByCategeory();
        countByCategeory.setCountHerbals(Herbals);
        countByCategeory.setCountPellets(Pellets);
        countByCategeory.setCountFineChemicals(FineChemicals);
        countByCategeory.setCountIntermediatesExcipients(IntermediatesExcipients);
        countByCategeory.setCountFinishedFormulation(FinishedFormulation);
        countByCategeory.setCountLabEquipment(LabEquipment);
        countByCategeory.setCountapis(Apis);


        return new ResponseEntity<CountByCategeory>(countByCategeory,HttpStatus.OK);
    }
}
