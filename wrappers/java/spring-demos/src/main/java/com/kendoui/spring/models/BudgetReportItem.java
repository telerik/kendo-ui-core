package com.kendoui.spring.models;

public class BudgetReportItem {
    private String unit;
    private int budget;
    private int spending;
    
    public BudgetReportItem(String unit, int budget, int spending) {
        setUnit(unit);
        setBudget(budget);
        setSpending(spending);
    }
    
    public String getUnit() {
        return unit;
    }

    public void setUnit(String unit) {
        this.unit = unit;
    }
    
    public int getBudget() {
        return budget;
    }

    public void setBudget(int budget) {
        this.budget = budget;
    }
    
    public int getSpending() {
        return spending;
    }

    public void setSpending(int spending) {
        this.spending = spending;
    }
}
