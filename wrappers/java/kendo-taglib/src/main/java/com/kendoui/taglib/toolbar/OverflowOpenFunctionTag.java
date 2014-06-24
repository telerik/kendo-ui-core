
package com.kendoui.taglib.toolbar;

import com.kendoui.taglib.FunctionTag;

import com.kendoui.taglib.ToolBarTag;


import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class OverflowOpenFunctionTag extends FunctionTag /* interfaces */ /* interfaces */ {
    
    @Override
    public int doEndTag() throws JspException {
//>> doEndTag


        ToolBarTag parent = (ToolBarTag)findParentWithClass(ToolBarTag.class);


        parent.setOverflowOpen(this);

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
//<< Attributes

}
