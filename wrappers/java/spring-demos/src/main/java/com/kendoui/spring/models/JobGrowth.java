package com.kendoui.spring.models;

public class JobGrowth {
    private int growth;
    private int jobs;
    private int applications;
    private String company;
    private int year;
    
    public JobGrowth(int growth, int jobs, int applications, String company, int year) {
        setGrowth(growth);
        setJobs(jobs);
        setApplications(applications);
        setCompany(company);
        setYear(year);
    }

    public int getGrowth() {
        return growth;
    }

    public void setGrowth(int growth) {
        this.growth = growth;
    }

    public int getJobs() {
        return jobs;
    }

    public void setJobs(int jobs) {
        this.jobs = jobs;
    }

    public int getApplications() {
        return applications;
    }

    public void setApplications(int applications) {
        this.applications = applications;
    }

    public String getCompany() {
        return company;
    }

    public void setCompany(String company) {
        this.company = company;
    }

    public int getYear() {
        return year;
    }

    public void setYear(int year) {
        this.year = year;
    }
    
    
}
