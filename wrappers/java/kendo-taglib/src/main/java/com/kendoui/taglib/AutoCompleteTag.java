package com.kendoui.taglib;

import java.io.IOException;

import javax.servlet.jsp.JspException;
import javax.servlet.jsp.JspTagException;
import javax.servlet.jsp.JspWriter;
import javax.servlet.jsp.PageContext;
import javax.servlet.jsp.tagext.BodyContent;
import javax.servlet.jsp.tagext.BodyTag;
import javax.servlet.jsp.tagext.Tag;

public class AutoCompleteTag implements BodyTag {

    protected PageContext pageContext;

    @Override
    public int doAfterBody() throws JspException {
        return SKIP_BODY;
    }

    @Override
    public int doEndTag() throws JspException {
        JspWriter writer = pageContext.getOut();
        
        try {
        writer.print("<input type=\"text\" />");
        } catch (IOException ex) {
            throw new JspTagException(ex);
        }
        
        return EVAL_PAGE;
    }

    @Override
    public int doStartTag() throws JspException {
        JspWriter writer = pageContext.getOut();
        
        try {
        writer.print("<input type=\"text\" />");
        } catch (IOException ex) {
            throw new JspTagException(ex);
        }
        
        return EVAL_BODY_BUFFERED;
    }

    @Override
    public Tag getParent() {
        return null;
    }

    @Override
    public void release() {

    }

    @Override
    public void setPageContext(PageContext pageContext) {
        this.pageContext = pageContext;
    }

    @Override
    public void setParent(Tag arg0) {
    }

    @Override
    public void doInitBody() throws JspException {
    }

    @Override
    public void setBodyContent(BodyContent arg0) {

    }
}
