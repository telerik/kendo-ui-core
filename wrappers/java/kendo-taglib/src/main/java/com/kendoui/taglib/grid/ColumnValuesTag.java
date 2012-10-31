
package com.kendoui.taglib.grid;

import javax.servlet.jsp.JspException;

import com.kendoui.taglib.BaseTag;

@SuppressWarnings("serial")
public class ColumnValuesTag extends BaseTag /* interfaces *//* interfaces */ {
    
    @Override
    public int doEndTag() throws JspException {

        ColumnTag parent = (ColumnTag)findParentWithClass(ColumnTag.class);
        
        parent.setValues(this);

        return super.doEndTag();
    }

    @Override
    public void initialize() {
        
        super.initialize();
    }

    @Override
    public void destroy() {     
        super.destroy();
    }

    public static String tagName() {
        return "grid-column-value";
    }

    public Object getValue() {
        return (Object)getProperty("value");
    }

    public void setValue(Object value) {
        setProperty("value", value);
    }
}
