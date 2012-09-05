package com.kendoui.taglib;

import com.kendoui.taglib.json.Function;

@SuppressWarnings("serial")
public class RangeSliderTag extends WidgetTag {
    public RangeSliderTag() {
        super("RangeSlider");
    }

    //>> Attributes

    public boolean getEnabled() {
        return (boolean)getProperty("enabled");
    }

    public void setEnabled(boolean enabled) {
        setProperty("enabled", enabled);
    }

    public int getMin() {
        return (int)getProperty("min");
    }

    public void setMin(int min) {
        setProperty("min", min);
    }

    public int getMax() {
        return (int)getProperty("max");
    }

    public void setMax(int max) {
        setProperty("max", max);
    }

    public int getSmallStep() {
        return (int)getProperty("smallStep");
    }

    public void setSmallStep(int smallStep) {
        setProperty("smallStep", smallStep);
    }

    public int getLargeStep() {
        return (int)getProperty("largeStep");
    }

    public void setLargeStep(int largeStep) {
        setProperty("largeStep", largeStep);
    }

    public String getOrientation() {
        return (String)getProperty("orientation");
    }

    public void setOrientation(String orientation) {
        setProperty("orientation", orientation);
    }

    public String getTickPlacement() {
        return (String)getProperty("tickPlacement");
    }

    public void setTickPlacement(String tickPlacement) {
        setProperty("tickPlacement", tickPlacement);
    }

    public Function getChange() {
        return (Function)getProperty("change");
    }

    public void setChange(String change) {
        setProperty("change", new Function(change));
    }

    public Function getSlide() {
        return (Function)getProperty("slide");
    }

    public void setSlide(String slide) {
        setProperty("slide", new Function(slide));
    }

    //<< Attributes
}