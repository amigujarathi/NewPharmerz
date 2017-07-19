package com.pharmerz.server.domain.model;


/**
 * Created by User on 31-03-2017.
 */
public class EnquiryEmail {
    String[] organisationIds;
    String productname;


    public EnquiryEmail() {
    }

    public EnquiryEmail(String[] organisationIds, String productname) {
        this.organisationIds = organisationIds;
        this.productname = productname;
    }

    public String[] getOrganisationIds() {
        return organisationIds;
    }

    public void setOrganisationIds(String[] organisationIds) {
        this.organisationIds = organisationIds;
    }

    public String getProductname() {
        return productname;
    }

    public void setProductname(String productname) {
        this.productname = productname;
    }
}
