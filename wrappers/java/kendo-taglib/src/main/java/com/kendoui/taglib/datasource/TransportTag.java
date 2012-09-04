package com.kendoui.taglib.datasource;

import javax.servlet.jsp.JspException;

import com.kendoui.taglib.BaseTag;
import com.kendoui.taglib.DataSourceTag;

@SuppressWarnings("serial")
public class TransportTag extends BaseTag {
    @Override
    public int doEndTag() throws JspException {
        DataSourceTag dataSource = (DataSourceTag)findParentWithClass(DataSourceTag.class);

        dataSource.setTransport(this);

        return EVAL_PAGE;
    }

    public void setRead(ReadTag read) {
        setProperty("read", read);
    }
}
