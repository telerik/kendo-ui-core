package com.kendoui.taglib;

@SuppressWarnings("serial")
public class SliderTag extends WidgetTag {
    public SliderTag() {
        super("Slider");
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

    public boolean getShowButtons() {
        return (boolean)getProperty("showButtons");
    }

    public void setShowButtons(boolean showButtons) {
        setProperty("showButtons", showButtons);
    }

    public String getIncreaseButtonTitle() {
        return (String)getProperty("increaseButtonTitle");
    }

    public void setIncreaseButtonTitle(String increaseButtonTitle) {
        setProperty("increaseButtonTitle", increaseButtonTitle);
    }

    public String getDecreaseButtonTitle() {
        return (String)getProperty("decreaseButtonTitle");
    }

    public void setDecreaseButtonTitle(String decreaseButtonTitle) {
        setProperty("decreaseButtonTitle", decreaseButtonTitle);
    }

    //<< Attributes
}