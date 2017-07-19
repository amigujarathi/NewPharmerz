package com.pharmerz.server.domain.model;

import javax.persistence.*;
import java.io.Serializable;


/**
 * Created by Amit on 1/7/2017.
 */


@Entity
@Table(name = "USER_CONTACTS")
@NamedQueries({
        @NamedQuery(name = "Contactus.findAll", query = "SELECT c FROM Contactus c")})
public class Contactus extends Domain implements Serializable {
    private static final long serialVersionUID = 1L;


    /***************Columns Parameters**************************/
    private String FULL_NAME;
    private String COMPANY_NAME;
    private String EMAIL;
    private String CONTACT_NUMBER;
    private String ADDRESS;
    private String COMMENTS;
    @Basic(optional = false)
    @Column(nullable = false)
    private int ACKNOWLEDGE;

    /***************parametrised construtor**************************/

    public Contactus(String FULL_NAME, String COMPANY_NAME, String EMAIL, String CONTACT_NUMBER, String ADDRESS, String COMMENTS, int ACKNOWLEDGE) {

        this.FULL_NAME = FULL_NAME;
        this.COMPANY_NAME = COMPANY_NAME;
        this.EMAIL = EMAIL;
        this.CONTACT_NUMBER = CONTACT_NUMBER;
        this.ADDRESS = ADDRESS;
        this.COMMENTS = COMMENTS;
        this.ACKNOWLEDGE = ACKNOWLEDGE;
    }

    /***************Default Constructor**************************/

    public Contactus() {
    }

    /***************Getter And Setters**************************/


    public String getFULL_NAME() {
        return FULL_NAME;
    }

    public void setFULL_NAME(String FULL_NAME) {
        this.FULL_NAME = FULL_NAME;
    }

    public String getCOMPANY_NAME() {
        return COMPANY_NAME;
    }

    public void setCOMPANY_NAME(String COMPANY_NAME) {
        this.COMPANY_NAME = COMPANY_NAME;
    }

    public String getEMAIL() {
        return EMAIL;
    }

    public void setEMAIL(String EMAIL) {
        this.EMAIL = EMAIL;
    }

    public String getCONTACT_NUMBER() {
        return CONTACT_NUMBER;
    }

    public void setCONTACT_NUMBER(String CONTACT_NUMBER) {
        this.CONTACT_NUMBER = CONTACT_NUMBER;
    }

    public String getADDRESS() {
        return ADDRESS;
    }

    public void setADDRESS(String ADDRESS) {
        this.ADDRESS = ADDRESS;
    }

    public String getCOMMENTS() {
        return COMMENTS;
    }

    public void setCOMMENTS(String COMMENTS) {
        this.COMMENTS = COMMENTS;
    }

    public int getACKNOWLEDGE() {
        return ACKNOWLEDGE;
    }

    public void setACKNOWLEDGE(int ACKNOWLEDGE) {
        this.ACKNOWLEDGE = ACKNOWLEDGE;
    }


}
