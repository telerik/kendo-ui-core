
package com.kendoui.taglib;

import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class GroupableTag extends BaseTag /* interfaces */implements Messages/* interfaces */ {

//>> Attributes

    @Override
    public int doEndTag() throws JspException {
        Groupable parent = (Groupable)findParentWithClass(Groupable.class);

        parent.setGroupable(this);

        return EVAL_PAGE;
    }

    @Override
    public void setMessages(MessagesTag value) {
        setProperty("messages", value);
    }

//<< Attributes
}
