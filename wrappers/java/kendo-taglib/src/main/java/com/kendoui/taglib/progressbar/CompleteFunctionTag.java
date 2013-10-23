
package com.kendoui.taglib.progressbar;

import com.kendoui.taglib.FunctionTag;

import com.kendoui.taglib.ProgressBarTag;


import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class CompleteFunctionTag extends FunctionTag /* interfaces */ /* interfaces */ {
    
    @Override
    public int doEndTag() throws JspException {
//>> doEndTag


        ProgressBarTag parent = (ProgressBarTag)findParentWithClass(ProgressBarTag.class);


        parent.setComplete(this);

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
