package com.pharmerz.server.domain.model;

/**
 * Created by User on 31-03-2017.
 */
public class QuotationEmail {

    String reciveremail;
    String product;
    String recivername;

    public QuotationEmail() {
    }

    public QuotationEmail(String reciveremail, String product, String recivername) {
        this.reciveremail = reciveremail;
        this.product = product;
        this.recivername = recivername;
    }


    public String getReciveremail() {
        return reciveremail;
    }

    public void setReciveremail(String reciveremail) {
        this.reciveremail = reciveremail;
    }

    public String getProduct() {
        return product;
    }

    public void setProduct(String product) {
        this.product = product;
    }

    public String getRecivername() {
        return recivername;
    }

    public void setRecivername(String recivername) {
        this.recivername = recivername;
    }
}
