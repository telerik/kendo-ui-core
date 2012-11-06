package com.kendoui.spring.models;

public class EngineDataPoint{
    private int rpm;
    private double torque;
    private double power;
    
    public int getRPM() {
        return rpm;
    }

    public void setRPM(int rpm) {
        this.rpm = rpm;
    }
    
    public double getTorque() {
        return torque;
    }

    public void setTorque(double torque) {
        this.torque = torque;
    }
    
    public double getPower() {
        return power;
    }

    public void setPower(double power) {
        this.power = power;
    }
}
