
package com.kendoui.taglib;



import com.kendoui.taglib.json.Function;


@SuppressWarnings("serial")
public class NumericTextBoxTag extends WidgetTag /* interfaces *//* interfaces */ {

    public NumericTextBoxTag() {
        super("NumericTextBox");
    }

//>> Attributes

    public String getCulture() {
        return (String)getProperty("culture");
    }

    public void setCulture(String value) {
        setProperty("culture", value);
    }

    public int getDecimals() {
        return (int)getProperty("decimals");
    }

    public void setDecimals(int value) {
        setProperty("decimals", value);
    }

    public String getDownArrowText() {
        return (String)getProperty("downArrowText");
    }

    public void setDownArrowText(String value) {
        setProperty("downArrowText", value);
    }

    public String getFormat() {
        return (String)getProperty("format");
    }

    public void setFormat(String value) {
        setProperty("format", value);
    }

    public int getMax() {
        return (int)getProperty("max");
    }

    public void setMax(int value) {
        setProperty("max", value);
    }

    public int getMin() {
        return (int)getProperty("min");
    }

    public void setMin(int value) {
        setProperty("min", value);
    }

    public String getPlaceholder() {
        return (String)getProperty("placeholder");
    }

    public void setPlaceholder(String value) {
        setProperty("placeholder", value);
    }

    public boolean getSpinners() {
        return (boolean)getProperty("spinners");
    }

    public void setSpinners(boolean value) {
        setProperty("spinners", value);
    }

    public int getStep() {
        return (int)getProperty("step");
    }

    public void setStep(int value) {
        setProperty("step", value);
    }

    public String getUpArrowText() {
        return (String)getProperty("upArrowText");
    }

    public void setUpArrowText(String value) {
        setProperty("upArrowText", value);
    }

    public int getValue() {
        return (int)getProperty("value");
    }

    public void setValue(int value) {
        setProperty("value", value);
    }

    public String getChange() {
        return ((Function)getProperty("change")).getBody();
    }

    public void setChange(String value) {
        setProperty("change", new Function(value));
    }

    public String getSpin() {
        return ((Function)getProperty("spin")).getBody();
    }

    public void setSpin(String value) {
        setProperty("spin", new Function(value));
    }

//<< Attributes
}
