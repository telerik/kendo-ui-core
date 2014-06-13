package com.kendoui.spring.models;

public class CashFlowData {
    private String period;
    private Float amount;
    private String summary;
    
    public CashFlowData(String period, double amount) {
        setPeriod(period);
        setAmount(new Float(amount));
    }
    
    public CashFlowData(String period, String summary)
    {
        setPeriod(period);
        setSummary(summary);
    }

    public String getPeriod() {
        return period;
    }

    public void setPeriod(String period) {
        this.period = period;
    }

    public Float getAmount() {
        return amount;
    }

    public void setAmount(Float amount) {
        this.amount = amount;
    }

    public String getSummary() {
        return summary;
    }

    public void setSummary(String summary) {
        this.summary = summary;
    }
}
