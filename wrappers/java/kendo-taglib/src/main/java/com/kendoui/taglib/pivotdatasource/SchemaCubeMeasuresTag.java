package com.kendoui.taglib.pivotdatasource;

import javax.servlet.jsp.JspException;

import com.kendoui.taglib.BaseTag;

@SuppressWarnings("serial")
public class SchemaCubeMeasuresTag extends BaseTag {
    @Override
    public int doEndTag() throws JspException {
        SchemaCubeTag parent = (SchemaCubeTag)findParentWithClass(SchemaCubeTag.class);

        parent.setMeasures(this);

        return super.doEndTag();
    }

    public void addMeasure(SchemaCubeMeasureTag measureTag) {
        String name = measureTag.getName();
        
        measureTag.properties().remove("name");
        
        setProperty(name, measureTag.properties());
    }

    public static String tagName() {
        return "pivotDataSource-schema-cube-measures";
    }
}
