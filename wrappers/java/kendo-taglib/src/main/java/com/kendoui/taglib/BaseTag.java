package com.kendoui.taglib;

import java.io.IOException;
import java.io.StringWriter;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.jsp.JspException;
import javax.servlet.jsp.JspWriter;
import javax.servlet.jsp.tagext.BodyTagSupport;

import com.kendoui.taglib.html.Element;
import com.kendoui.taglib.html.Script;

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
        JspWriter out = pageContext.getOut();

        Element<?> element = html();
        Script script = script();

        try {
            element.write(out);

            script.write(out);
        } catch (IOException exception) {
            throw new JspException(exception);
        }

        return EVAL_PAGE;
    }

    public Element<?> html() {
        Element<?> element = createElement();

        element.attr("id", getName());

        return element;
    }

    public Script script() {
        StringWriter content = new StringWriter();

        content.append("jQuery(function(){jQuery(\"#")
               .append(getName())
               .append("\").kendo")
               .append(widget)
               .append("(");

        try {
            new Serializer().serialize(content, this);
        } catch (IOException exception) {
            // StringWriter is not supposed to throw IOException
        }

        content.append(");})");

        Script script = new Script();

        script.html(content.toString());

        return script;
    }

    protected abstract Element<?> createElement();
}
