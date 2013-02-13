
package com.kendoui.taglib.tooltip;

import com.kendoui.taglib.FunctionTag;

import com.kendoui.taglib.TooltipTag;


import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class RequestStartFunctionTag extends FunctionTag /* interfaces */ /* interfaces */ {
    
    @Override
    public int doEndTag() throws JspException {
//>> doEndTag


        TooltipTag parent = (TooltipTag)findParentWithClass(TooltipTag.class);


        parent.setRequestStart(this);

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
