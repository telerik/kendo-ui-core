package com.kendoui.taglib;

import java.io.PrintWriter;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.jsp.JspException;
import javax.servlet.jsp.tagext.BodyTagSupport;

import com.kendoui.taglib.json.Serializable;

@SuppressWarnings("serial")
public abstract class BaseTag extends BodyTagSupport implements Serializable {
    private String name;
    private Map<String,Object> json;

    public BaseTag() {
        json = new HashMap<String,Object>();
    }

    @Override
    public Map<String,Object> properties() {
        return json;
    }

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
