
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

    public void setAggregates(AggregatesFunctionTag value) {
        setEvent("aggregates", value.getBody());
    }

    public void setData(DataFunctionTag value) {
        setEvent("data", value.getBody());
    }

    public void setErrors(ErrorsFunctionTag value) {
        setEvent("errors", value.getBody());
    }

    public void setGroups(GroupsFunctionTag value) {
        setEvent("groups", value.getBody());
    }

    public void setParse(ParseFunctionTag value) {
        setEvent("parse", value.getBody());
    }

    public void setTotal(TotalFunctionTag value) {
        setEvent("total", value.getBody());
    }

    public String getAggregates() {
        return (String)getProperty("aggregates");
    }

    public void setAggregates(String value) {
        setProperty("aggregates", value);
    }

    public String getData() {
        return (String)getProperty("data");
    }

    public void setData(String value) {
        setProperty("data", value);
    }

    public String getErrors() {
        return (String)getProperty("errors");
    }

    public void setErrors(String value) {
        setProperty("errors", value);
    }

    public String getGroups() {
        return (String)getProperty("groups");
    }

    public void setGroups(String value) {
        setProperty("groups", value);
    }

    public Object getModel() {
        return (Object)getProperty("model");
    }

    public void setModel(Object value) {
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

    public String getTotal() {
        return (String)getProperty("total");
    }

    public void setTotal(String value) {
        setProperty("total", value);
    }

    public String getType() {
        return (String)getProperty("type");
    }

    public void setType(String value) {
        setProperty("type", value);
    }

//<< Attributes

}
