
package com.kendoui.taglib.combobox;

import com.kendoui.taglib.FunctionTag;

import com.kendoui.taglib.ComboBoxTag;


import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class OpenTag extends FunctionTag /* interfaces *//* interfaces */ {
    
    @Override
    public int doEndTag() throws JspException {
//>> doEndTag

        ComboBoxTag parent = (ComboBoxTag)findParentWithClass(ComboBoxTag.class);

        parent.setOpen(this);

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
        return "comboBox-open";
    }

//<< Attributes

}
