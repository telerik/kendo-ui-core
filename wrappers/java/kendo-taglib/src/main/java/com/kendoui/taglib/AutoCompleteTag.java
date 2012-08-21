package com.kendoui.taglib;

import java.io.IOException;

import javax.servlet.jsp.JspException;
import javax.servlet.jsp.JspTagException;
import javax.servlet.jsp.JspWriter;
import javax.servlet.jsp.tagext.BodyTagSupport;

public class AutoCompleteTag extends BodyTagSupport implements DataBoundWidget {
    private static final long serialVersionUID = 7924820302914859197L;
    private String name;
    
    @Override
    public int doEndTag() throws JspException {
        JspWriter writer = pageContext.getOut();

        try {
            writer.print("<input type=\"text\" value=\"it is works!!!\" />");
        } catch (IOException ex) {
            throw new JspTagException(ex);
        }

        return EVAL_PAGE;
    }

    @Override
    public void setDataSource(DataSource dataSource) {

    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
