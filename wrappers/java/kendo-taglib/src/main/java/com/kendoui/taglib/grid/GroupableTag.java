
package com.kendoui.taglib.grid;

import com.kendoui.taglib.BaseTag;

import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class GroupableTag extends BaseTag /* interfaces */implements Messages/* interfaces */ {

    
    @Override
    public int doEndTag() throws JspException {
//>> doEndTag

        Groupable parent = (Groupable)findParentWithClass(Groupable.class);

        parent.setGroupable(this);

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
        return "grid-groupable";
    }

    @Override
    public void setMessages(MessagesTag value) {
        setProperty("messages", value.properties());
    }

//<< Attributes

}
