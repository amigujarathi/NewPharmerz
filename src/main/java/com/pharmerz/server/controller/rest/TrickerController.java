package com.pharmerz.server.controller.rest;

import com.pharmerz.server.domain.model.Contactus;
import com.pharmerz.server.domain.model.Product;
import com.pharmerz.server.domain.model.Tricker;
import com.pharmerz.server.domain.repository.IProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.Collection;

/**
 * Created by User on 05-05-2017.
 */
@RestController
public class TrickerController {

    @Autowired
    IProductRepository iProductRepository;

    @GetMapping(value = "/tricker", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<ArrayList<Tricker>> getproducts() {
        ArrayList<Product> cp= (ArrayList<Product>) iProductRepository.findAll();
        ArrayList<Tricker> t=new ArrayList<>();
    //    Tricker tt=new Tricker();
        for(int i=0;i<=50;i++){
            Tricker tt=new Tricker();
            tt.setId(cp.get(i).getId());
            tt.setProductname(cp.get(i).getProduct());
            t.add(tt);

        }



        return new ResponseEntity<ArrayList<Tricker>>(t, HttpStatus.OK);
    }

}
