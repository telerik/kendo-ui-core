package com.kendoui.spring.models;

public class SocialBenefits {
    private SocialBenefitType type;
    private double value;
    
    public SocialBenefits(SocialBenefitType type, double value) {
        this.type = type;
        this.value = value;
    }
    
    public SocialBenefitType getType() {
        return type;
    }

    public void setType(SocialBenefitType type) {
        this.type = type;
    }

    public double getValue() {
        return value;
    }
    
    public void setValue(double value) {
        this.value = value;
    }
}
