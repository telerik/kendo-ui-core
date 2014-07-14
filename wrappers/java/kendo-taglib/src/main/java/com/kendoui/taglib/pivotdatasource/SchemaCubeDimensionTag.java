package com.kendoui.taglib.pivotdatasource;

import javax.servlet.jsp.JspException;

import com.kendoui.taglib.BaseTag;

@SuppressWarnings("serial")
public class SchemaCubeDimensionTag extends BaseTag {
    @Override
    public int doEndTag() throws JspException {
        SchemaCubeDimensionsTag parent = (SchemaCubeDimensionsTag)findParentWithClass(SchemaCubeDimensionsTag.class);

        parent.addDimension(this);

        return super.doEndTag();
    }
    
    public String getName() {
        return (String)getProperty("name");
    }
    
    public void setName(String field) {
        setProperty("name", field);
    }    
    
    public String getCaption() {
        return (String)getProperty("caption");
    }
    
    public void setCaption(String caption) {
        setProperty("caption", caption);
    }  
    
    public static String tagName() {
        return "pivotDataSource-schema-cube-dimention";
    }
}
