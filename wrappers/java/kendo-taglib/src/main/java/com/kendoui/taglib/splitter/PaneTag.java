
package com.kendoui.taglib.splitter;

import com.kendoui.taglib.BaseTag;

import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class PaneTag extends BaseTag /* interfaces *//* interfaces */ {

//>> Attributes

    public int doEndTag() throws JspException {
        PanesTag parent = (PanesTag)findParentWithClass(PanesTag.class);

        parent.addPane(this);

        return EVAL_PAGE;
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

    public boolean getContentUrl() {
        return (boolean)getProperty("contentUrl");
    }

    public void setContentUrl(boolean value) {
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
}
