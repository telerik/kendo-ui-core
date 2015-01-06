
package com.kendoui.taglib.diagram;

import com.kendoui.taglib.FunctionTag;

import com.kendoui.taglib.DiagramTag;


import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class MouseEnterFunctionTag extends FunctionTag /* interfaces */ /* interfaces */ {
    
    @Override
    public int doEndTag() throws JspException {
//>> doEndTag


        DiagramTag parent = (DiagramTag)findParentWithClass(DiagramTag.class);


        parent.setMouseEnter(this);

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
