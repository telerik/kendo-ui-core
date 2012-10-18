package com.kendoui.taglib.datasource;

import javax.servlet.jsp.JspException;

import com.kendoui.taglib.BaseTag;

@SuppressWarnings("serial")
public class FieldsTag extends BaseTag {
    @Override
    public int doEndTag() throws JspException {
        ModelTag parent = (ModelTag)findParentWithClass(ModelTag.class);

        parent.setFields(this);

        return super.doEndTag();
    }

    public void addField(FieldTag fieldTag) {
        String name = fieldTag.getName();
        
        fieldTag.properties().remove("name");
        
        setProperty(name, fieldTag.properties());
    }

    public static String tagName() {
        return "dataSource-schema-model-fields";
    }
}
