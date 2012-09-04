package com.kendoui.taglib;

@SuppressWarnings("serial")
public class NumericTextBoxTag extends WidgetTag {
    public NumericTextBoxTag() {
        super("NumericTextBox");
    }

    //>> Attributes

    public int getStep() {
        return (int)getProperty("step");
    }

    public void setStep(int step) {
        setProperty("step", step);
    }

    public String getCulture() {
        return (String)getProperty("culture");
    }

    public void setCulture(String culture) {
        setProperty("culture", culture);
    }

    public String getFormat() {
        return (String)getProperty("format");
    }

    public void setFormat(String format) {
        setProperty("format", format);
    }

    public boolean getSpinners() {
        return (boolean)getProperty("spinners");
    }

    public void setSpinners(boolean spinners) {
        setProperty("spinners", spinners);
    }

    public String getPlaceholder() {
        return (String)getProperty("placeholder");
    }

    public void setPlaceholder(String placeholder) {
        setProperty("placeholder", placeholder);
    }

    public String getUpArrowText() {
        return (String)getProperty("upArrowText");
    }

    public void setUpArrowText(String upArrowText) {
        setProperty("upArrowText", upArrowText);
    }

    public String getDownArrowText() {
        return (String)getProperty("downArrowText");
    }

    public void setDownArrowText(String downArrowText) {
        setProperty("downArrowText", downArrowText);
    }

    //<< Attributes
}