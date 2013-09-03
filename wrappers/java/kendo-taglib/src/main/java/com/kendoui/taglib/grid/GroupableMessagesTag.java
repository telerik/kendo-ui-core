
package com.kendoui.taglib.grid;


import com.kendoui.taglib.BaseTag;






import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class GroupableMessagesTag extends  BaseTag  /* interfaces *//* interfaces */ {
    
    @Override
    public int doEndTag() throws JspException {
//>> doEndTag


        GroupableTag parent = (GroupableTag)findParentWithClass(GroupableTag.class);


        parent.setMessages(this);

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
        return "grid-groupable-messages";
    }

    public java.lang.String getEmpty() {
        return (java.lang.String)getProperty("empty");
    }

    public void setEmpty(java.lang.String value) {
        setProperty("empty", value);
    }

//<< Attributes

}
