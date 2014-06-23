
package com.kendoui.taglib.contextmenu;

import com.kendoui.taglib.FunctionTag;

import com.kendoui.taglib.ContextMenuTag;


import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class DeactivateFunctionTag extends FunctionTag /* interfaces */ /* interfaces */ {
    
    @Override
    public int doEndTag() throws JspException {
//>> doEndTag


        ContextMenuTag parent = (ContextMenuTag)findParentWithClass(ContextMenuTag.class);


        parent.setDeactivate(this);

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
        return "contextMenu-deactivate";
    }

//<< Attributes

}
