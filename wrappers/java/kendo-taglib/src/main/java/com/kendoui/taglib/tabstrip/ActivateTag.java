
package com.kendoui.taglib.tabstrip;

import com.kendoui.taglib.FunctionTag;

import com.kendoui.taglib.TabStripTag;


import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class ActivateTag extends FunctionTag /* interfaces *//* interfaces */ {
    
    @Override
    public int doEndTag() throws JspException {
//>> doEndTag

        TabStripTag parent = (TabStripTag)findParentWithClass(TabStripTag.class);

        parent.setActivate(this);

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
        return "tabStrip-activate";
    }

//<< Attributes

}
