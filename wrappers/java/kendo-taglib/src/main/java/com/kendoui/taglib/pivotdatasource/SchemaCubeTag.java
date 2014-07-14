package com.kendoui.taglib.pivotdatasource;

import javax.servlet.jsp.JspException;

import com.kendoui.taglib.BaseTag;

@SuppressWarnings("serial")
public class SchemaCubeTag extends BaseTag {
    @Override
    public int doEndTag() throws JspException {
        com.kendoui.taglib.pivotdatasource.SchemaTag parent = (com.kendoui.taglib.pivotdatasource.SchemaTag)findParentWithClass(SchemaTag.class);

        parent.setCube(this);

        return super.doEndTag();
    }
    
    public void setDimensions(SchemaCubeDimensionsTag dimensionsTag) {
        setProperty("dimensions", dimensionsTag.properties());
    }
    
    public void setMeasures(SchemaCubeMeasuresTag measuresTag) {
        setProperty("measures", measuresTag.properties());
    }
    
    public static String tagName() {
        return "pivotDataSource-schema-cube";
    }
}
