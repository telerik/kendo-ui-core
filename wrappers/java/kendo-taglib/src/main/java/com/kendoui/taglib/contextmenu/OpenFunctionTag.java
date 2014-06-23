
package com.kendoui.taglib.contextmenu;

import com.kendoui.taglib.FunctionTag;

import com.kendoui.taglib.ContextMenuTag;


import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class OpenFunctionTag extends FunctionTag /* interfaces */ /* interfaces */ {
    
    @Override
    public int doEndTag() throws JspException {
//>> doEndTag


        ContextMenuTag parent = (ContextMenuTag)findParentWithClass(ContextMenuTag.class);


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
        return "contextMenu-open";
    }

//<< Attributes

}
