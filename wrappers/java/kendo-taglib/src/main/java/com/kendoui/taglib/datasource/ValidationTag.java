package com.kendoui.taglib.datasource;

import javax.servlet.jsp.JspException;

import com.kendoui.taglib.BaseTag;

@SuppressWarnings("serial")
public class ValidationTag extends BaseTag {
    @Override
    public int doEndTag() throws JspException {
        FieldTag parent = (FieldTag)findParentWithClass(FieldTag.class);

        parent.setValidation(this);

        return super.doEndTag();
    }
    
    public boolean getRequired() {
        return (boolean)getProperty("required");
    }
    
    public void setRequired(boolean value) {
        setProperty("required", value);
    }
    
    public String getPattern() {
        return (String)getProperty("pattern");
    }
    
    public void setPattern(String value) {
        setProperty("pattern", value);
    }

    public double getMin() {
        return (double)getProperty("min");
    }
    
    public void setMin(double value) {
        setProperty("min", value);
    }

    public double getMax() {
        return (double)getProperty("max");
    }
    
    public void setMax(double value) {
        setProperty("max", value);
    }
    
    public static String tagName() {
        return "dataSource-schema-model-field-validation";
    }
}
