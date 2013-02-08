
package com.kendoui.taglib.multiselect;

import com.kendoui.taglib.FunctionTag;

import com.kendoui.taglib.MultiSelectTag;


import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class CloseFunctionTag extends FunctionTag /* interfaces */ /* interfaces */ {
    
    @Override
    public int doEndTag() throws JspException {
//>> doEndTag


        MultiSelectTag parent = (MultiSelectTag)findParentWithClass(MultiSelectTag.class);


        parent.setClose(this);

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
