package com.pharmerz.Appcations;//package com.pharmerz.Appcations;
//
//import com.amazonaws.auth.AWSCredentials;
//import com.amazonaws.auth.BasicAWSCredentials;
//import com.amazonaws.services.s3.AmazonS3Client;
//import com.amazonaws.services.s3.model.Bucket;
//import com.amazonaws.services.s3.model.CreateBucketRequest;
//import com.amazonaws.services.s3.model.ObjectMetadata;
//import com.amazonaws.services.s3.model.PutObjectRequest;
//
//import java.io.File;
//import java.net.URL;
//import java.sql.Date;
//import java.time.Instant;
//import java.time.temporal.ChronoUnit;
//
///**
// * Created by User on 28-02-2017.
// */
//public class UploadToS3 {
//
//    AWSCredentials credentials=new BasicAWSCredentials("","");
//    AmazonS3Client amazonS3Client=new AmazonS3Client(credentials);
//    long lenghtOfFileToUpload;
//    Bucket newBucket;
//    File file;
//    final String bucketName="";
//    final String key ="";
//
//    {
//        CreateBucketRequest createBucketRequest=new CreateBucketRequest(bucketName);
//        newBucket=amazonS3Client.createBucket(createBucketRequest);
//        URL urlToFile=UploadToS3.class.getResource("");
//        String fullFilePath=urlToFile.getFile();
//        file=new File(fullFilePath);
//        lenghtOfFileToUpload=file.length();
//
//    }
//    {
//
//        PutObjectRequest putObjectRequest=new PutObjectRequest(newBucket.getName(),key,file);
//        ObjectMetadata objectMetadata=new ObjectMetadata();
//        objectMetadata.setContentLength(lenghtOfFileToUpload);
//        putObjectRequest.withMetadata(objectMetadata);
//        amazonS3Client.putObject(putObjectRequest);
//    }
//    {
//        URL url=amazonS3Client.generatePresignedUrl(bucketName,key, Date.from(Instant.now().plus(5, ChronoUnit.MINUTES)));
//    }
//
//}
