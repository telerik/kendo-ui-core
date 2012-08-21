package com.kendoui.taglib;

import javax.servlet.jsp.JspException;
import javax.servlet.jsp.tagext.BodyTagSupport;

public class DataSourceTag extends BodyTagSupport {
    private static final long serialVersionUID = 7924820302914859197L;

    @Override
    public int doEndTag() throws JspException {

        return EVAL_PAGE;
    }
}
