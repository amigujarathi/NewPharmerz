package com.pharmerz.Appcations;//package com.pharmerz.Appcations;

/**
 * Created by User on 28-02-2017.
 */

import java.io.*;
import java.net.URL;
import java.sql.Date;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Base64;

import com.amazonaws.AmazonClientException;
import com.amazonaws.AmazonServiceException;
import com.amazonaws.auth.AWSCredentials;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.auth.profile.ProfileCredentialsProvider;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.GetObjectRequest;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.amazonaws.services.s3.model.S3Object;

public class UploadObjectSingleOperation {
    private static String bucketName = "pharmerz-chat";
    private static String keyName = "Exel";
    // private static String uploadFileName = "C:\\Users\\User\\Desktop\\Pharmerz_Web_Endpoints.xlsx";
    private static String uploadFileName = "C:\\Users\\User\\Desktop\\stacktrace.txt";

    //  private static String uploadFileName="C:\\Users\\User\\Desktop\\upload\\tmpFiles";

    public void uploadfile(AWSCredentials credentials) {
        AmazonS3 s3client = new AmazonS3Client(credentials);
        try {
            System.out.println("Uploading a new object to S3 from a file\n");
            File file = new File(uploadFileName);

            /**Demo conversio*/
            s3client.putObject(new PutObjectRequest(
                    bucketName, keyName, file));



            URL url = s3client.generatePresignedUrl(bucketName, keyName, Date.from(Instant.now().plus(5, ChronoUnit.MINUTES)));
            // URL url=s3client.generatePresignedUrl(bucketName,keyName, Date.from(Instant.now().plus(5, ChronoUnit.)));
            System.out.println("************************************");
            System.out.println(url);


        } catch (AmazonServiceException ase) {
            System.out.println("Caught an AmazonServiceException, which " +
                    "means your request made it " +
                    "to Amazon S3, but was rejected with an error response" +
                    " for some reason.");
            System.out.println("Error Message:    " + ase.getMessage());
            System.out.println("HTTP Status Code: " + ase.getStatusCode());
            System.out.println("AWS Error Code:   " + ase.getErrorCode());
            System.out.println("Error Type:       " + ase.getErrorType());
            System.out.println("Request ID:       " + ase.getRequestId());
        } catch (AmazonClientException ace) {
            System.out.println("Caught an AmazonClientException, which " +
                    "means the client encountered " +
                    "an internal error while trying to " +
                    "communicate with S3, " +
                    "such as not being able to access the network.");
            System.out.println("Error Message: " + ace.getMessage());
        }

    }

    void downloadfile(AWSCredentials credentials2) throws IOException {
        AmazonS3 s3client = new AmazonS3Client(credentials2);
        try {
            System.out.println("Downloading a new object to S3 from a file\n");
            S3Object s3Object = s3client.getObject(new GetObjectRequest(bucketName, keyName));
            System.out.println("content type: " + s3Object.getObjectMetadata().getContentType());
            InputStream input = s3Object.getObjectContent();
            BufferedReader reader = new BufferedReader(new InputStreamReader(input));
            while (true) {
                String line = reader.readLine();
                if (line == null) break;
                System.out.println("  " + line);

            }
            System.out.println();
        } catch (AmazonServiceException ase) {
            System.out.println("Caught an AmazonServiceException, which " +
                    "means your request made it " +
                    "to Amazon S3, but was rejected with an error response" +
                    " for some reason.");
            System.out.println("Error Message:    " + ase.getMessage());
            System.out.println("HTTP Status Code: " + ase.getStatusCode());
            System.out.println("AWS Error Code:   " + ase.getErrorCode());
            System.out.println("Error Type:       " + ase.getErrorType());
            System.out.println("Request ID:       " + ase.getRequestId());
        } catch (AmazonClientException ace) {
            System.out.println("Caught an AmazonClientException, which " +
                    "means the client encountered " +
                    "an internal error while trying to " +
                    "communicate with S3, " +
                    "such as not being able to access the network.");
            System.out.println("Error Message: " + ace.getMessage());
        }


    }


    public static void main(String[] args) {
        AWSCredentials credentials = new BasicAWSCredentials("AKIAI5T24QARKTXLDXLQ", "zrBG4pjtPc8mr4yAC8wvpakbpyUqsKp3NVPcWq0m");
        UploadObjectSingleOperation s3clent = new UploadObjectSingleOperation();
        s3clent.uploadfile(credentials);
    }

}