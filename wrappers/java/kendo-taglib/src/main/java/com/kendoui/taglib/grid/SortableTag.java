
package com.kendoui.taglib.grid;

import com.kendoui.taglib.BaseTag;

import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class SortableTag extends BaseTag /* interfaces *//* interfaces */ {

    
    @Override
    public int doEndTag() throws JspException {
//>> doEndTag

        Sortable parent = (Sortable)findParentWithClass(Sortable.class);

        parent.setSortable(this);

//<< doEndTag

        return super.doEndTag();
    }

    @Override
    public void initialize() {
//>> initialize
//<< initialize

        super.initialize();
    }

    @Override
    public void destroy() {
//>> destroy
//<< destroy

        super.destroy();
    }

//>> Attributes

    public static String tagName() {
        return "grid-sortable";
    }

    public boolean getAllowUnsort() {
        return (boolean)getProperty("allowUnsort");
    }

    public void setAllowUnsort(boolean value) {
        setProperty("allowUnsort", value);
    }

    public String getMode() {
        return (String)getProperty("mode");
    }

    public void setMode(String value) {
        setProperty("mode", value);
    }

//<< Attributes

}
