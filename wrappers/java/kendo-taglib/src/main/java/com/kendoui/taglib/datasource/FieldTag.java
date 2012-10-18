package com.kendoui.taglib.datasource;

import javax.servlet.jsp.JspException;

import com.kendoui.taglib.BaseTag;

@SuppressWarnings("serial")
public class FieldTag extends BaseTag {
    @Override
    public int doEndTag() throws JspException {
        FieldsTag parent = (FieldsTag)findParentWithClass(FieldsTag.class);

        parent.addField(this);

        return super.doEndTag();
    }
    
    public String getName() {
        return (String)getProperty("name");
    }
    
    public void setName(String name) {
        setProperty("name", name);
    }
    
    public Object getDefaultValue() {
        return getProperty("defaultValue");
    }
    
    public void setDefaultValue(Object value) {
        try {
            value = Double.parseDouble(value.toString());
        }catch(NumberFormatException e) {
            
        }
        setProperty("defaultValue", value);
    }
    
    public boolean getEditable() {
        return (boolean)getProperty("editable");
    }
    
    public void setEditable(boolean value) {
        setProperty("editable", value);
    }
    
    public boolean getNullable() {
        return (boolean)getProperty("nullable");
    }
    
    public void setNullable(boolean value) {
        setProperty("nullable", value);
    }
    
    public String getType() {
        return (String)getProperty("type");
    }
    
    public void setType(String value) {
        setProperty("type", value);
    }
    
}
