package com.kendoui.taglib.datasource;

import javax.servlet.jsp.JspException;

import com.kendoui.taglib.BaseTag;

@SuppressWarnings("serial")
public class ReadTag extends BaseTag {
    @Override
    public int doEndTag() throws JspException {
        TransportTag transport = (TransportTag)findParentWithClass(TransportTag.class);

        transport.setRead(this);

        return EVAL_PAGE;
    }
}
