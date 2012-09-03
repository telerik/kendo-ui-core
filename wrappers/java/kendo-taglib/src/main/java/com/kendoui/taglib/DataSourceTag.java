package com.kendoui.taglib;

import javax.servlet.jsp.JspException;

import com.kendoui.taglib.datasource.TransportTag;

@SuppressWarnings("serial")
public class DataSourceTag extends BaseTag {
    @Override
    public int doEndTag() throws JspException {
        DataBoundWidget widget = (DataBoundWidget)findAncestorWithClass(this, DataBoundWidget.class);

        widget.setDataSource(this);

        return EVAL_PAGE;
    }

    public void setTransport(TransportTag transport) {
        setProperty("transport", transport);
    }
}
