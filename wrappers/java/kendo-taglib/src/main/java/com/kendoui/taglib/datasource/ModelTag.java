package com.kendoui.taglib.datasource;

import javax.servlet.jsp.JspException;

import com.kendoui.taglib.BaseTag;

@SuppressWarnings("serial")
public class ModelTag extends BaseTag {
    @Override
    public int doEndTag() throws JspException {
        SchemaTag parent = (SchemaTag)findParentWithClass(SchemaTag.class);

        parent.setModel(this);

        return super.doEndTag();
    }
    
    public String getId() {
        return (String)getProperty("id");
    }
    
    public void setId(String id) {
        setProperty("id", id);
    }

    public void setFields(FieldsTag fieldsTag) {
        setProperty("fields", fieldsTag.properties());
    }
}
