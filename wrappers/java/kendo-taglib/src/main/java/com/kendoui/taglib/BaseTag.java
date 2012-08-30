package com.kendoui.taglib;

import java.io.IOException;
import java.io.PrintWriter;
import java.io.StringWriter;
import java.io.Writer;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.jsp.JspException;
import javax.servlet.jsp.tagext.BodyTagSupport;

import com.kendoui.taglib.html.Element;

import com.kendoui.taglib.json.Serializable;
import com.kendoui.taglib.json.Serializer;

@SuppressWarnings("serial")
public abstract class BaseTag extends BodyTagSupport implements Serializable {
    private String name;
    private String widget;

    protected Map<String,Object> json;

    public BaseTag(String widget) {
        this.json = new HashMap<String,Object>();
        this.widget = widget;
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

    public Element<?> html() {
        Element<?> element = createElement();

        return element;
    }

    public void script(Writer out) throws IOException {
        out.append("jQuery(\"#")
           .append(getName())
           .append("\").kendo")
           .append(widget)
           .append("(");

        new Serializer().serialize(out, this);

        out.append(");");
    }

    public String script() throws IOException {
        StringWriter out = new StringWriter();

        script(out);

        return out.toString();
    }

    protected abstract Element<?> createElement();
}
