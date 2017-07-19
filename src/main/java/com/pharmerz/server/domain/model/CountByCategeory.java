package com.pharmerz.server.domain.model;

/**
 * Created by Amit on 10-04-2017.
 *
 * To count the dynamic product count based on categeory.
 */
public class CountByCategeory {


    private long countHerbals;
    private long countPellets;
    private long countFineChemicals;
    private long countIntermediatesExcipients;
    private long countFinishedFormulation;
    private long countLabEquipment;
    private long countapis;

    public CountByCategeory() {

    }

    public CountByCategeory(long countHerbals, long countPellets, long countFineChemicals, long countIntermediatesExcipients, long countFinishedFormulation, long countLabEquipment, long countapis) {
        this.countHerbals = countHerbals;
        this.countPellets = countPellets;
        this.countFineChemicals = countFineChemicals;
        this.countIntermediatesExcipients = countIntermediatesExcipients;
        this.countFinishedFormulation = countFinishedFormulation;
        this.countLabEquipment = countLabEquipment;
        this.countapis = countapis;
    }

    public long getCountHerbals() {
        return countHerbals;
    }

    public void setCountHerbals(long countHerbals) {
        this.countHerbals = countHerbals;
    }

    public long getCountPellets() {
        return countPellets;
    }

    public void setCountPellets(long countPellets) {
        this.countPellets = countPellets;
    }

    public long getCountFineChemicals() {
        return countFineChemicals;
    }

    public void setCountFineChemicals(long countFineChemicals) {
        this.countFineChemicals = countFineChemicals;
    }

    public long getCountIntermediatesExcipients() {
        return countIntermediatesExcipients;
    }

    public void setCountIntermediatesExcipients(long countIntermediatesExcipients) {
        this.countIntermediatesExcipients = countIntermediatesExcipients;
    }

    public long getCountFinishedFormulation() {
        return countFinishedFormulation;
    }

    public void setCountFinishedFormulation(long countFinishedFormulation) {
        this.countFinishedFormulation = countFinishedFormulation;
    }

    public long getCountLabEquipment() {
        return countLabEquipment;
    }

    public void setCountLabEquipment(long countLabEquipment) {
        this.countLabEquipment = countLabEquipment;
    }

    public long getCountapis() {
        return countapis;
    }

    public void setCountapis(long countapis) {
        this.countapis = countapis;
    }
}
