
package com.kendoui.taglib.scheduler;

import com.kendoui.taglib.FunctionTag;

import com.kendoui.taglib.SchedulerTag;


import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class ResizeStartFunctionTag extends FunctionTag /* interfaces */ /* interfaces */ {
    
    @Override
    public int doEndTag() throws JspException {
//>> doEndTag


        SchedulerTag parent = (SchedulerTag)findParentWithClass(SchedulerTag.class);


        parent.setResizeStart(this);

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
