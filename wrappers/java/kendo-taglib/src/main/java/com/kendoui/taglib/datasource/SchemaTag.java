
package com.kendoui.taglib.datasource;

import com.kendoui.taglib.BaseTag;

import com.kendoui.taglib.DataSourceTag;



import com.kendoui.taglib.json.Function;


import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class SchemaTag extends BaseTag /* interfaces *//* interfaces */ {
    
    @Override
    public int doEndTag() throws JspException {
//>> doEndTag


        DataSourceTag parent = (DataSourceTag)findParentWithClass(DataSourceTag.class);


        parent.setSchema(this);

//<< doEndTag

        return super.doEndTag();
    }

    @Override
    public void initialize() {
//>> initialize
//<< initialize

        super.initialize();
    }

    @Override
    public void destroy() {
//>> destroy
//<< destroy

        super.destroy();
    }

//>> Attributes

    public static String tagName() {
        return "dataSource-schema";
    }

    public void setAggregates(SchemaAggregatesFunctionTag value) {
        setEvent("aggregates", value.getBody());
    }

    public void setData(SchemaDataFunctionTag value) {
        setEvent("data", value.getBody());
    }

    public void setErrors(SchemaErrorsFunctionTag value) {
        setEvent("errors", value.getBody());
    }

    public void setGroups(SchemaGroupsFunctionTag value) {
        setEvent("groups", value.getBody());
    }

    public void setParse(SchemaParseFunctionTag value) {
        setEvent("parse", value.getBody());
    }

    public void setTotal(SchemaTotalFunctionTag value) {
        setEvent("total", value.getBody());
    }

    public java.lang.String getAggregates() {
        return (java.lang.String)getProperty("aggregates");
    }

    public void setAggregates(java.lang.String value) {
        setProperty("aggregates", value);
    }

    public java.lang.String getData() {
        return (java.lang.String)getProperty("data");
    }

    public void setData(java.lang.String value) {
        setProperty("data", value);
    }

    public java.lang.String getErrors() {
        return (java.lang.String)getProperty("errors");
    }

    public void setErrors(java.lang.String value) {
        setProperty("errors", value);
    }

    public java.lang.String getGroups() {
        return (java.lang.String)getProperty("groups");
    }

    public void setGroups(java.lang.String value) {
        setProperty("groups", value);
    }

    public java.lang.Object getModel() {
        return (java.lang.Object)getProperty("model");
    }

    public void setModel(java.lang.Object value) {
        setProperty("model", value);
    }

    public String getParse() {
        Function property = ((Function)getProperty("parse"));
        if (property != null) {
            return property.getBody();
        }
        return null;
    }

    public void setParse(String value) {
        setProperty("parse", new Function(value));
    }

    public java.lang.String getTotal() {
        return (java.lang.String)getProperty("total");
    }

    public void setTotal(java.lang.String value) {
        setProperty("total", value);
    }

    public java.lang.String getType() {
        return (java.lang.String)getProperty("type");
    }

    public void setType(java.lang.String value) {
        setProperty("type", value);
    }

//<< Attributes

}
