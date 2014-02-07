
package com.kendoui.taglib.notification;

import com.kendoui.taglib.FunctionTag;

import com.kendoui.taglib.NotificationTag;


import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class ShowFunctionTag extends FunctionTag /* interfaces */ /* interfaces */ {
    
    @Override
    public int doEndTag() throws JspException {
//>> doEndTag


        NotificationTag parent = (NotificationTag)findParentWithClass(NotificationTag.class);


        parent.setShow(this);

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
