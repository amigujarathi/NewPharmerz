//package com.pharmerz.server.controller.rest;
//
//import com.amazonaws.AmazonClientException;
//import com.amazonaws.AmazonServiceException;
//import com.amazonaws.auth.AWSCredentials;
//import com.amazonaws.auth.BasicAWSCredentials;
//import com.amazonaws.services.s3.AmazonS3;
//import com.amazonaws.services.s3.AmazonS3Client;
//import com.amazonaws.services.s3.model.GetObjectRequest;
//import com.amazonaws.services.s3.model.PutObjectRequest;
//import com.amazonaws.services.s3.model.S3Object;
//import com.pharmerz.Appcations.UploadObjectSingleOperation;
//import com.sun.jersey.multipart.MultiPart;
//import org.springframework.web.bind.annotation.*;
//import org.springframework.web.multipart.MultipartFile;
//
//import javax.mail.Multipart;
//import java.io.*;
//import java.net.URL;
//import java.sql.Date;
//import java.time.Instant;
//import java.time.temporal.ChronoUnit;
//
///**
// * Created by User on 30-03-2017.
// */
//@RestController
//@RequestMapping("/api/v2")
//public class UploadDownloadController {
//
//    private static String bucketName     = "pharmerz-chat";
//    private static String keyName        = "Exel";
//     private static String uploadFileName="C:\\Users\\User\\Desktop\\upload\\tmpFiles";
//
//
//
//
//
//
//
//    @RequestMapping(value = "/upload", method = RequestMethod.POST, consumes = "multipart/form-data")
//    public void uploadFileHandler(@RequestParam("name") String name,
//                                  @RequestParam("file") MultipartFile file) {
//
//        if (!file.isEmpty()) {
//            try {
//                byte[] bytes = file.getBytes();
//
//                // Creating the directory to store file
//                //String rootPath = System.getProperty("catalina.home");
//                String rootPath = "C:\\Users\\User\\Desktop\\upload";
//                File dir = new File(rootPath + File.separator + "tmpFiles");
//                if (!dir.exists())
//                    dir.mkdirs();
//
//                System.out.println(file.getOriginalFilename());
//
//                // Create the file on server
//                File serverFile = new File(dir.getAbsolutePath()
//                        + File.separator + name);
//                BufferedOutputStream stream = new BufferedOutputStream(
//                        new FileOutputStream(serverFile));
//                stream.write(bytes);
//                stream.close();
//
//                System.out.println("Server File Location="
//                        + serverFile.getAbsolutePath());
//
//                System.out.println("You successfully uploaded file=" + name);
//            } catch (Exception e) {
//                System.out.println("You failed to upload " + name + " => " + e.getMessage());
//            }
//        } else {
//            System.out.println("You failed to upload " + name
//                    + " because the file was empty.");
//        }
//
//        AWSCredentials credentials=new BasicAWSCredentials("AKIAI5T24QARKTXLDXLQ","zrBG4pjtPc8mr4yAC8wvpakbpyUqsKp3NVPcWq0m");
//        UploadObjectSingleOperation s3clent=new UploadObjectSingleOperation();
//        s3clent.uploadfile(credentials);
//    }
//
////    void uploadfile(AWSCredentials credentials){
////        AmazonS3 s3client =new AmazonS3Client(credentials);
////        try {
////            System.out.println("Uploading a new object to S3 from a file\n");
////            File file = new File(uploadFileName);
////            s3client.putObject(new PutObjectRequest(
////                    bucketName, keyName,file ));
////
////
////            URL url=s3client.generatePresignedUrl(bucketName,keyName, Date.from(Instant.now().plus(5, ChronoUnit.MINUTES)));
////            // URL url=s3client.generatePresignedUrl(bucketName,keyName, Date.from(Instant.now().plus(5, ChronoUnit.)));
////            System.out.println("************************************");
////            System.out.println(url);
////
////
////        }catch (AmazonServiceException ase) {
////            System.out.println("Caught an AmazonServiceException, which " +
////                    "means your request made it " +
////                    "to Amazon S3, but was rejected with an error response" +
////                    " for some reason.");
////            System.out.println("Error Message:    " + ase.getMessage());
////            System.out.println("HTTP Status Code: " + ase.getStatusCode());
////            System.out.println("AWS Error Code:   " + ase.getErrorCode());
////            System.out.println("Error Type:       " + ase.getErrorType());
////            System.out.println("Request ID:       " + ase.getRequestId());
////        } catch (AmazonClientException ace) {
////            System.out.println("Caught an AmazonClientException, which " +
////                    "means the client encountered " +
////                    "an internal error while trying to " +
////                    "communicate with S3, " +
////                    "such as not being able to access the network.");
////            System.out.println("Error Message: " + ace.getMessage());
////        }
////
////    }
////
////    void downloadfile(AWSCredentials credentials2) throws IOException{
////        AmazonS3 s3client =new AmazonS3Client(credentials2);
////        try{
////            System.out.println("Downloading a new object to S3 from a file\n");
////            S3Object s3Object=s3client.getObject(new GetObjectRequest(bucketName,keyName));
////            System.out.println("content type: " + s3Object.getObjectMetadata().getContentType());
////            InputStream input =s3Object.getObjectContent();
////            BufferedReader reader=new BufferedReader(new InputStreamReader(input));
////            while (true){
////                String line=reader.readLine();
////                if(line==null)break;
////                System.out.println("  "+line);
////
////            }
////            System.out.println();
////        }catch (AmazonServiceException ase) {
////            System.out.println("Caught an AmazonServiceException, which " +
////                    "means your request made it " +
////                    "to Amazon S3, but was rejected with an error response" +
////                    " for some reason.");
////            System.out.println("Error Message:    " + ase.getMessage());
////            System.out.println("HTTP Status Code: " + ase.getStatusCode());
////            System.out.println("AWS Error Code:   " + ase.getErrorCode());
////            System.out.println("Error Type:       " + ase.getErrorType());
////            System.out.println("Request ID:       " + ase.getRequestId());
////        } catch (AmazonClientException ace) {
////            System.out.println("Caught an AmazonClientException, which " +
////                    "means the client encountered " +
////                    "an internal error while trying to " +
////                    "communicate with S3, " +
////                    "such as not being able to access the network.");
////            System.out.println("Error Message: " + ace.getMessage());
////        }
////
//
//
//    }
