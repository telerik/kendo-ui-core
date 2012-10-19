
package com.kendoui.taglib.datasource;

import com.kendoui.taglib.BaseTag;
import com.kendoui.taglib.json.Function;

import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class SchemaTag extends BaseTag /* interfaces *//* interfaces */ {
    
    @Override
    public int doEndTag() throws JspException {
//>> doEndTag

        Schema parent = (Schema)findParentWithClass(Schema.class);

        parent.setSchema(this);

//<< doEndTag

        return super.doEndTag();
    }
    
    public void setModel(ModelTag modelTag) {
        setProperty("model", modelTag.properties());
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

    public String getAggregates() {
        return ((Function)getProperty("aggregates")).getBody();
    }

    public void setAggregates(String value) {
        setProperty("aggregates", new Function(value));
    }

    public String getData() {
        return ((Function)getProperty("data")).getBody();
    }

    public void setData(String value) {
        setProperty("data", new Function(value));
    }

    public String getErrors() {
        return ((Function)getProperty("errors")).getBody();
    }

    public void setErrors(String value) {
        setProperty("errors", new Function(value));
    }

    public String getGroups() {
        return ((Function)getProperty("groups")).getBody();
    }

    public void setGroups(String value) {
        setProperty("groups", new Function(value));
    }

    public String getParse() {
        return ((Function)getProperty("parse")).getBody();
    }

    public void setParse(String value) {
        setProperty("parse", new Function(value));
    }

    public String getTotal() {
        return ((Function)getProperty("total")).getBody();
    }

    public void setTotal(String value) {
        setProperty("total", new Function(value));
    }

    public String getType() {
        return (String)getProperty("type");
    }

    public void setType(String value) {
        setProperty("type", value);
    }

//<< Attributes

}
