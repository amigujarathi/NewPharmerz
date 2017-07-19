//package com.pharmerz.server.controller.rest;
//
//import com.pharmerz.server.domain.model.Enquiry;
//import com.pharmerz.server.domain.model.Product;
//
//import com.pharmerz.server.domain.model.ProductVerifyExist;
//import com.pharmerz.server.domain.repository.IProductRepository;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.*;
//
//import java.util.List;
//import java.util.UUID;
//
///**
// * Created by User on 01-06-2017.
// */
//@RestController
//@RequestMapping("/api/v1")
//public class ProductController {
//
//    @Autowired
//    IProductRepository iProductRepository;
///******** To check the product is present already present or not on parameters product name ,categeoryid,composition ****/
//
//@PostMapping("/productexist")
//public ResponseEntity<ProductVerifyExist> verifyProductExists(ProductVerifyExist productVerifyExist){
//
//    String productname=productVerifyExist.getProductname();
//  //  String productcomposition=productVerifyExist.getComposition();
//    UUID categeory=productVerifyExist.getCategeoryid();
//
//    System.out.println("productname "+productname);
//  //  System.out.println("productcomposition "+productcomposition);
//    System.out.println("categeory "+categeory);
//    List<Product> productpresent=iProductRepository.findByProductAndCategoryId(productname,categeory);
//    if(productpresent!=null){
//        return new ResponseEntity<ProductVerifyExist>(HttpStatus.OK);
//    }else {
//        return new ResponseEntity<ProductVerifyExist>(HttpStatus.BAD_REQUEST);
//    }
//}
//
//
//@GetMapping("/productPresent/{productname}/{categeoryp}")
//    public ResponseEntity<Product> productPresent(@PathVariable String productname,@PathVariable UUID categeoryp){
//
//    String product=productname;
//    //  String productcomposition=productVerifyExist.getComposition();
//    UUID categeory=categeoryp;
//
//    System.out.println("product "+product);
//    //  System.out.println("productcomposition "+productcomposition);
//    System.out.println("categeory "+categeory);
//    List<Product> productpresent=iProductRepository.findByProductAndCategoryId(productname,categeory);
//
//    System.out.println("productpresent "+productpresent);
//    if(productpresent.isEmpty()){
//        Product p=new Product();
//        return new ResponseEntity<Product>(p,HttpStatus.OK);
//
//    }else {
//        Product responseProduct=productpresent.iterator().next();
//        return new ResponseEntity<Product>(responseProduct,HttpStatus.OK);
//    }
//
//}
//}
