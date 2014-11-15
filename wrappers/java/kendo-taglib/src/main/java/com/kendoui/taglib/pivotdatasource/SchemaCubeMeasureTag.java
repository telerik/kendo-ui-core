package com.kendoui.taglib.pivotdatasource;

import javax.servlet.jsp.JspException;

import com.kendoui.taglib.BaseTag;
import com.kendoui.taglib.json.Function;

@SuppressWarnings("serial")
public class SchemaCubeMeasureTag extends BaseTag {
    @Override
    public int doEndTag() throws JspException {
        SchemaCubeMeasuresTag parent = (SchemaCubeMeasuresTag)findParentWithClass(SchemaCubeMeasuresTag.class);

        parent.addMeasure(this);

        return super.doEndTag();
    }

    public String getName() {
        return (String)getProperty("name");
    }

    public void setName(String field) {
        setProperty("name", field);
    }

    public String getFormat() {
        return (String)getProperty("format");
    }

    public void setFormat(String format) {
        setProperty("format", format);
    }

    public String getCaption() {
        return (String)getProperty("caption");
    }

    public void setCaption(String caption) {
        setProperty("caption", caption);
    }
    public String getField() {
        return (String)getProperty("field");
    }

    public void setField(String field) {
        setProperty("field", field);
    }

    public void setAggregate(SchemaCubeMeasureAggregateFunctionTag aggregate) {
        setProperty("aggregate", aggregate.getBody());
    }

    public String getAggregate() {
        Function property = ((Function)getProperty("aggregate"));
        if (property != null) {
            return property.getBody();
        }
        return null;
    }

    public void setAggregate(String value) {
        setProperty("aggregate", new Function(value));
    }

    public String getAggregateName() {
        return (String)getProperty("aggregate");
    }

    public void setAggregateName(String aggregateName) {
        setProperty("aggregate", aggregateName);
    }

    public void setResult(SchemaCubeMeasureResultFunctionTag result) {
        setProperty("result", result.getBody());
    }

    public String getResult() {
        Function property = ((Function)getProperty("result"));
        if (property != null) {
            return property.getBody();
        }
        return null;
    }

    public void setResult(String value) {
        setProperty("result", new Function(value));
    }

    public static String tagName() {
        return "pivotDataSource-schema-cube-measure";
    }


}
