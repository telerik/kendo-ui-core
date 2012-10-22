
package com.kendoui.taglib;

import com.kendoui.taglib.numerictextbox.*;

import com.kendoui.taglib.json.Function;

import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class NumericTextBoxTag extends WidgetTag /* interfaces *//* interfaces */ {

    public NumericTextBoxTag() {
        super("NumericTextBox");
    }

    
    @Override
    public int doEndTag() throws JspException {
//>> doEndTag
//<< doEndTag

        return super.doEndTag();
    }

    @Override
    public void initialize() {
//>> initialize
//<< initialize

        super.initialize();
    }

    @Override
    public void destroy() {
//>> destroy
//<< destroy

        super.destroy();
    }

//>> Attributes

    public static String tagName() {
        return "numericTextBox";
    }

    public void setChange(ChangeFunctionTag value) {
        setEvent("change", value.getBody());
    }

    public void setSpin(SpinFunctionTag value) {
        setEvent("spin", value.getBody());
    }

    public String getCulture() {
        return (String)getProperty("culture");
    }

    public void setCulture(String value) {
        setProperty("culture", value);
    }

    public float getDecimals() {
        return (float)getProperty("decimals");
    }

    public void setDecimals(float value) {
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

    public float getMax() {
        return (float)getProperty("max");
    }

    public void setMax(float value) {
        setProperty("max", value);
    }

    public float getMin() {
        return (float)getProperty("min");
    }

    public void setMin(float value) {
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

    public float getStep() {
        return (float)getProperty("step");
    }

    public void setStep(float value) {
        setProperty("step", value);
    }

    public String getUpArrowText() {
        return (String)getProperty("upArrowText");
    }

    public void setUpArrowText(String value) {
        setProperty("upArrowText", value);
    }

    public float getValue() {
        return (float)getProperty("value");
    }

    public void setValue(float value) {
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
