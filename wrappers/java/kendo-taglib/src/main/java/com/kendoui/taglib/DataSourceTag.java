package com.kendoui.taglib;

import javax.servlet.jsp.JspException;

import com.kendoui.taglib.datasource.TransportTag;

@SuppressWarnings("serial")
public class DataSourceTag extends BaseTag {

    @Override
    public int doEndTag() throws JspException {
        DataBoundWidget widget = (DataBoundWidget)findParentWithClass(DataBoundWidget.class, "tag which supports data binding");

        widget.setDataSource(this);

        return EVAL_PAGE;
    }

    public void setTransport(TransportTag transport) {
        setProperty("transport", transport);
    }

//>> Attributes

    public String getType() {
        return (String)getProperty("type");
    }

    public void setType(String type) {
        setProperty("type", type);
    }

    public boolean getServerFiltering() {
        return (boolean)getProperty("serverFiltering");
    }

    public void setServerFiltering(boolean serverFiltering) {
        setProperty("serverFiltering", serverFiltering);
    }

    public boolean getServerPaging() {
        return (boolean)getProperty("serverPaging");
    }

    public void setServerPaging(boolean serverPaging) {
        setProperty("serverPaging", serverPaging);
    }

    public int getPageSize() {
        return (int)getProperty("pageSize");
    }

    public void setPageSize(int pageSize) {
        setProperty("pageSize", pageSize);
    }

    //<< Attributes
}
