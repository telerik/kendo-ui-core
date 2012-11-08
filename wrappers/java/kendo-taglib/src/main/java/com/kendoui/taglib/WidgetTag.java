package com.kendoui.taglib;

import java.io.IOException;
import java.io.StringWriter;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.jsp.JspException;
import javax.servlet.jsp.JspWriter;
import javax.servlet.jsp.tagext.DynamicAttributes;

import com.kendoui.taglib.html.Div;
import com.kendoui.taglib.html.Element;
import com.kendoui.taglib.html.Script;

import com.kendoui.taglib.json.Serializable;
import com.kendoui.taglib.json.Serializer;

@SuppressWarnings("serial")
public abstract class WidgetTag extends BaseTag implements Serializable, DynamicAttributes  {
    private String name;
    private String widget;
    private Map<String, Object> attributes;


    public WidgetTag(String widget) {
        this.widget = widget;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
    @Override
    public void initialize() {
        attributes = new HashMap<String, Object>();
        
        super.initialize();
    }
    
    @Override
    public void destroy() {
        attributes = null;
        
        super.destroy();
    }
    
    @Override
    public void setDynamicAttribute(String uri, String localName, Object value) throws JspException {
        attributes.put(localName, value);
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

        return super.doEndTag();
    }

    public Element<?> html() {
        Element<?> element = createElement();

        element.attr("id", getName());

        for (String attribute : attributes.keySet()) {
            Object value = attributes.get(attribute);
            
            if (value != null) {
                element.attr(attribute, value);
            }
        }

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

    protected Element<?> createElement() {
        return new Div();
    }
}
