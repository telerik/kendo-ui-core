package com.kendoui.taglib.pivotdatasource;

import javax.servlet.jsp.JspException;

import com.kendoui.taglib.BaseTag;

@SuppressWarnings("serial")
public class SchemaCubeDimensionsTag extends BaseTag {
    @Override
    public int doEndTag() throws JspException {
        SchemaCubeTag parent = (SchemaCubeTag)findParentWithClass(SchemaCubeTag.class);

        parent.setDimensions(this);

        return super.doEndTag();
    }

    public void addDimension(SchemaCubeDimensionTag dimentionTag) {
        String name = dimentionTag.getName();
        
        dimentionTag.properties().remove("name");
        
        setProperty(name, dimentionTag.properties());
    }

    public static String tagName() {
        return "pivotDataSource-schema-cube-dimension";
    }
}
