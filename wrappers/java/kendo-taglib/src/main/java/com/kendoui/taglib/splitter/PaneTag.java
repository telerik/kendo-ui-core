
package com.kendoui.taglib.splitter;


import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import com.kendoui.taglib.BaseTag;
import com.kendoui.taglib.html.Div;

import javax.servlet.jsp.JspException;
import javax.servlet.jsp.tagext.DynamicAttributes;

@SuppressWarnings("serial")
public class PaneTag extends  BaseTag implements DynamicAttributes /* interfaces *//* interfaces */ {
    private Map<String, Object> attributes;
    
    @Override
    public int doEndTag() throws JspException {
//>> doEndTag

        PanesTag parent = (PanesTag)findParentWithClass(PanesTag.class);

        parent.addPane(this);

//<< doEndTag
        
        try {
            html().write(pageContext.getOut());                
        } catch (IOException exception) {
            throw new JspException(exception);
        }
        
        return super.doEndTag();
    }
    
    public Div html() {
        Div element = new Div();
        String content = body();

        for (String attribute : attributes.keySet()) {
            Object value = attributes.get(attribute);
            
            if (value != null) {
                element.attr(attribute, value);
            }
        }
        
        if (!content.isEmpty()) {                
            element.html(content);
        }

        return element;
    }

    @Override
    public void initialize() {
//>> initialize
//<< initialize
        attributes = new HashMap<String, Object>();

        super.initialize();
    }

    @Override
    public void destroy() {
//>> destroy
//<< destroy
        attributes = null;

        super.destroy();
    }

//>> Attributes

    public static String tagName() {
        return "splitter-pane";
    }

    public boolean getCollapsed() {
        return (boolean)getProperty("collapsed");
    }

    public void setCollapsed(boolean value) {
        setProperty("collapsed", value);
    }

    public boolean getCollapsible() {
        return (boolean)getProperty("collapsible");
    }

    public void setCollapsible(boolean value) {
        setProperty("collapsible", value);
    }

    public String getContentUrl() {
        return (String)getProperty("contentUrl");
    }

    public void setContentUrl(String value) {
        setProperty("contentUrl", value);
    }

    public String getMax() {
        return (String)getProperty("max");
    }

    public void setMax(String value) {
        setProperty("max", value);
    }

    public String getMin() {
        return (String)getProperty("min");
    }

    public void setMin(String value) {
        setProperty("min", value);
    }

    public boolean getResizable() {
        return (boolean)getProperty("resizable");
    }

    public void setResizable(boolean value) {
        setProperty("resizable", value);
    }

    public boolean getScrollable() {
        return (boolean)getProperty("scrollable");
    }

    public void setScrollable(boolean value) {
        setProperty("scrollable", value);
    }

    public String getSize() {
        return (String)getProperty("size");
    }

    public void setSize(String value) {
        setProperty("size", value);
    }

//<< Attributes
    
    @Override
    public void setDynamicAttribute(String uri, String localName, Object value) throws JspException {
        attributes.put(localName, value);
    }
}
