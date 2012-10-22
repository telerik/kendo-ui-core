
package com.kendoui.taglib.grid;

import com.kendoui.taglib.FunctionTag;

import com.kendoui.taglib.GridTag;


import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class SaveChangesFunctionTag extends FunctionTag /* interfaces *//* interfaces */ {
    
    @Override
    public int doEndTag() throws JspException {
//>> doEndTag

        GridTag parent = (GridTag)findParentWithClass(GridTag.class);

        parent.setSaveChanges(this);

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
        return "grid-saveChanges";
    }

//<< Attributes

}
