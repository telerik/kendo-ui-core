package com.kendoui.taglib;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.jsp.JspException;
import javax.servlet.jsp.JspTagException;
import javax.servlet.jsp.tagext.BodyTagSupport;

@SuppressWarnings("serial")
public abstract class BaseTag extends BodyTagSupport {
    private String name;
    
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @Override
    public int doEndTag() throws JspException {
        PrintWriter out = new PrintWriter(pageContext.getOut());

        out.format("<input id=\"{0}\"", getName());
        
        return EVAL_PAGE;
    }
    public abstract String getTagName();
}