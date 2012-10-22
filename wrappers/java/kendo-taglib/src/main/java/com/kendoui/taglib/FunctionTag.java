package com.kendoui.taglib;

import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public abstract class FunctionTag extends BaseTag {

    protected String body;

    public FunctionTag() {
        body = "";
    }
    
    @Override
    public int doEndTag() throws JspException {
        setBody(body());
        return super.doEndTag();
    }

    public void setBody(String body) {
        this.body = body.replaceAll("</?script[^>]*>", "").trim();
    }

    public String getBody() {
        return body;
    }

}
