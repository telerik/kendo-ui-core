
package com.kendoui.taglib.datasource;

import com.kendoui.taglib.BaseTag;

import com.kendoui.taglib.DataSourceTag;



import com.kendoui.taglib.json.Function;


import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class TransportTag extends BaseTag /* interfaces *//* interfaces */ {    
    @Override
    public int doEndTag() throws JspException {
//>> doEndTag


        DataSourceTag parent = (DataSourceTag)findParentWithClass(DataSourceTag.class);


        parent.setTransport(this);

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
        return "dataSource-transport";
    }

    public void setCreate(com.kendoui.taglib.datasource.TransportCreateTag value) {
        setProperty("create", value);
    }

    public void setDestroy(com.kendoui.taglib.datasource.TransportDestroyTag value) {
        setProperty("destroy", value);
    }

    public void setRead(com.kendoui.taglib.datasource.TransportReadTag value) {
        setProperty("read", value);
    }

    public void setUpdate(com.kendoui.taglib.datasource.TransportUpdateTag value) {
        setProperty("update", value);
    }

    public void setParameterMap(TransportParameterMapFunctionTag value) {
        setEvent("parameterMap", value.getBody());
    }

    public java.lang.String getCreate() {
        return (java.lang.String)getProperty("create");
    }

    public void setCreate(java.lang.String value) {
        setProperty("create", value);
    }

    public java.lang.String getDestroy() {
        return (java.lang.String)getProperty("destroy");
    }

    public void setDestroy(java.lang.String value) {
        setProperty("destroy", value);
    }

    public String getParameterMap() {
        Function property = ((Function)getProperty("parameterMap"));
        if (property != null) {
            return property.getBody();
        }
        return null;
    }

    public void setParameterMap(String value) {
        setProperty("parameterMap", new Function(value));
    }

    public java.lang.String getRead() {
        return (java.lang.String)getProperty("read");
    }

    public void setRead(java.lang.String value) {
        setProperty("read", value);
    }

    public java.lang.String getUpdate() {
        return (java.lang.String)getProperty("update");
    }

    public void setUpdate(java.lang.String value) {
        setProperty("update", value);
    }

//<< Attributes

}
