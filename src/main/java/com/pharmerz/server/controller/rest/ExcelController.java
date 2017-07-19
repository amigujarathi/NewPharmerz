package com.pharmerz.server.controller.rest;


import com.fasterxml.jackson.databind.ObjectMapper;
import com.pharmerz.Appcations.Amazons3;
import com.pharmerz.server.domain.model.*;
import com.pharmerz.server.domain.repository.*;
import org.apache.poi.openxml4j.exceptions.InvalidFormatException;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.*;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.UUID;

/**
 * Created by Amit on 02-05-2017.
 */


@RestController
@RequestMapping("/api/v1")
public class ExcelController {


    @Autowired
    private ICategoryRepository iCategoryRepository;
    @Autowired
    private IProductRepository iProductRepository;
    @Autowired
    private IOrganizationRepository iOrganizationRepository;
    @Autowired
    private ISupplierRepository iSupplierRepository;
    @Autowired
    private IPurchaserRepository iPurchaserRepository;
    UUID OrganizationID;

    Organization organization;
    Amazons3 amazons3 = new Amazons3();


    ObjectMapper mapper = new ObjectMapper();

    @RequestMapping(value = "/excel", method = RequestMethod.POST, consumes = javax.ws.rs.core.MediaType.MULTIPART_FORM_DATA)
    public ResponseEntity uploadFileHandler(@RequestParam("organization") UUID organization,
                                            @RequestParam("file") MultipartFile file) throws IOException {

/*****GEt the organizaation id from form data and store to global variable*****/
        this.OrganizationID = organization;
        System.out.println("*****************************");

        /***Possible output parameters from file object***/

        System.out.println("file.getOriginalFilename() " + file.getOriginalFilename());
        System.out.println("file.getContentType()" + file.getContentType());
        System.out.println("file.getInputStream() " + file.getInputStream());
        System.out.println("file.toString() " + file.toString());
        System.out.println("file.getSize() " + file.getSize());
        System.out.println("name " + organization);
        System.out.println("file.getBytes() " + file.getBytes());
        System.out.println("file.hashCode() " + file.hashCode());
        System.out.println("file.getClass() " + file.getClass());
        System.out.println("file.isEmpty() " + file.isEmpty());

//     if(file.getOriginalFilename().equalsIgnoreCase("sample_format.xlsx")){
         /***Parameters required for S3 bucket upload***/
         String timeStamp = new SimpleDateFormat("yyyy.MM.dd.HH.mm.ss").format(new java.util.Date());
         InputStream is = file.getInputStream();
         String keyname = timeStamp+file.getOriginalFilename();
         String bucketname = "pharmerz-chat";

         /**Call S3 upload class and upload file**/
         amazons3.uploadfile(is, keyname, bucketname);
         /****Get organisation object from organisation id***/
         this.organization = iOrganizationRepository.findOne(organization);

/**Excel File reader**/
         try {
             ExcelController ex = new ExcelController();
             File f1 = ex.convert(file);
             //     FileInputStream file = new FileInputStream(new File("E://Imp/Details.xlsx"));
             XSSFWorkbook workbook = new XSSFWorkbook(f1);
             XSSFSheet sheet = workbook.getSheetAt(0);
             Iterator<Row> rowIterator = sheet.iterator();
             rowIterator.next();

             //    while (rowIterator.hasNext()) {
             for(int i=1;i<=51;i++){
                 Row row = rowIterator.next();
                 //For each row, iterate through each columns
                 Iterator<Cell> cellIterator = row.cellIterator();

                 while (cellIterator.hasNext()) {

                     Cell cell = cellIterator.next();
                     //        System.out.println("cell.getStringCellValue().length() "+cell.getStringCellValue().length());
                     //   if( cell.getStringCellValue().length()>0){
                     List list = new ArrayList();
                     //       This will change all Cell Types to String
                     cell.setCellType(Cell.CELL_TYPE_STRING);
                     switch (cell.getCellType()) {
                         case Cell.CELL_TYPE_BOOLEAN:
                             String bstring = "" + cell.getBooleanCellValue();
                             list.add(cell.getBooleanCellValue());
                             System.out.println("boolean===>>>" + cell.getBooleanCellValue() + "\t");
                             break;
                         case Cell.CELL_TYPE_NUMERIC:
                             String Nstring = "" + cell.getNumericCellValue();
                             list.add(Nstring);
                             break;
                         case Cell.CELL_TYPE_STRING:


                             list.add(cell.getStringCellValue());


                             break;
                     }
//                   }else {
//                       break;
                     //        }


                 }
                 String productname = row.getCell(0).getStringCellValue();
                 String composition = row.getCell(1).getStringCellValue();
                 String productcategeory = row.getCell(2).getStringCellValue();
                 String uniqueproductcode = row.getCell(3).getStringCellValue();
                 String categeory = row.getCell(4).getStringCellValue();
                 String note = row.getCell(5).getStringCellValue();

                 //         System.out.println(productname+"" +composition+"" +productcategeory+" "+uniqueproductcode+" "+categeory+" "+note);
                 System.out.println("productname " + productname);
                 System.out.println("composition " + composition);
                 System.out.println("productcategeory " + productcategeory);
                 System.out.println("uniqueproductcode " + uniqueproductcode);
                 System.out.println(" categeory " + categeory);
                 System.out.println("note " + note);
                 ExcelController ex1 = new ExcelController();
                 //  ex1.InsertRowInDB3(name,email,add,company);


                 System.out.println("");
                 //     Category categeoryobject=iCategoryRepository.findOne(UUID.fromString(CategeoryId));
                 Category categeoryobject = iCategoryRepository.findByCategory(productcategeory);

                 if(composition.isEmpty()){
                     composition=null;
                 }
                 if(uniqueproductcode.isEmpty()){
                     uniqueproductcode=null;
                 }
                 if(note.isEmpty()){
                     note=null;
                 }

                 Product product = new Product();
                 product.setProduct(productname.toLowerCase());
                 product.setComposition(composition);
                 product.setCategory(categeoryobject);
                 product.setUpc(uniqueproductcode);
                 product.setNote(note);

                 insertProduct(product, categeory);


             }
             workbook.close();
         } catch (FileNotFoundException e) {
             e.printStackTrace();
         } catch (IOException e) {
             e.printStackTrace();
         } catch (InvalidFormatException e) {
             e.printStackTrace();
         } catch (NullPointerException e) {
             //      e.printStackTrace();
             System.out.println("data completed upload");
         }

//     }else {
//         return new ResponseEntity(HttpStatus.BAD_REQUEST);
//     }
     return new ResponseEntity(HttpStatus.OK);
    }

/**Insert product into database***/
    public String insertProduct (Product product, String categeory) {

        try{System.out.println("getProduct " + product.getProduct());
            System.out.println("getComposition " + product.getComposition());
            System.out.println("getCategory " + product.getCategory());
            System.out.println("getUpc " + product.getUpc());
            System.out.println("getCategory " + product.getCategory());
            System.out.println("getNote " + product.getNote());

//Boolean status=iProductRepository.findOneByProductAndCompositionAndCategory(product.getProduct(),product.getComposition(),product.getCategory()).;
            Boolean statusProduct=iProductRepository.findByProductAndCompositionAndCategoryId(product.getProduct(),product.getComposition(),product.getCategory().getId()) !=null;

            System.out.println(statusProduct);
            String categeoryidString=""+product.getCategory().getId();
            if (product.getProduct().isEmpty() || statusProduct==true   ) {
                System.out.println("Product is empty or data already exist");
                return "Product is empty or data already exist";
            } else {

                Product savedproduct = iProductRepository.save(product);
                if (categeory.equalsIgnoreCase("Sale")) {
                    Supplier supplier = new Supplier();
                    supplier.setProduct(savedproduct);
                    supplier.setOrganization(organization);
                    iSupplierRepository.save(supplier);
                    System.out.println("Product added to supplier " + categeory);
                } else if (categeory.equalsIgnoreCase("Purchase")) {
                    Purchaser purchaser = new Purchaser();
                    purchaser.setOrganization(organization);
                    purchaser.setProduct(savedproduct);
                    iPurchaserRepository.save(purchaser);
                    System.out.println("Product added to purchaser " + categeory);
                } else {
                    Supplier supplier = new Supplier();
                    supplier.setProduct(savedproduct);
                    supplier.setOrganization(organization);
                    iSupplierRepository.save(supplier);
                    Purchaser purchaser = new Purchaser();
                    purchaser.setOrganization(organization);
                    purchaser.setProduct(savedproduct);
                    iPurchaserRepository.save(purchaser);
                    System.out.println("Product added to both " + categeory);
                }

                System.out.println("product added");

                System.out.println("/************************");
                System.out.println(savedproduct.getId());

            }


            return "product added";}
            catch (Exception e){
          //  e.printStackTrace();
            return "all product finished";
            }

    }


    public File convert(MultipartFile file) throws IOException {
        File convFile = new File(file.getOriginalFilename());
        convFile.createNewFile();
        FileOutputStream fos = new FileOutputStream(convFile);
        fos.write(file.getBytes());
        fos.close();
        return convFile;
    }




}
