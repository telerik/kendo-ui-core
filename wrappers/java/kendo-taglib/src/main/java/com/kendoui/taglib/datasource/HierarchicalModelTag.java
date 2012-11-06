package com.kendoui.taglib.datasource;

import javax.servlet.jsp.JspException;

import com.kendoui.taglib.BaseTag;

@SuppressWarnings("serial")
public class HierarchicalModelTag extends BaseTag {
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
    
    public String getHasChildren() {
        return (String)getProperty("hasChildren");
    }
    
    public void setHasChildren(String hasChildren) {
        setProperty("hasChildren", hasChildren);
    }

    public void setFields(FieldsTag fieldsTag) {
        setProperty("fields", fieldsTag.properties());
    }
    
    public static String tagName() {
        return "dataSource-schema-hierarchical-model";
    }
}
