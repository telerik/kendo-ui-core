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

    public void setType(String type) {
        setProperty("type", type);
    }

    public void setServerFiltering(boolean serverFiltering) {
        setProperty("serverFiltering", serverFiltering);
    }

    public void setTransport(TransportTag transport) {
        setProperty("transport", transport);
    }
}
