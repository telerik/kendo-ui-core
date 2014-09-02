
package com.kendoui.taglib.grid;

import com.kendoui.taglib.BaseTag;

import com.kendoui.taglib.GridTag;




import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class GroupableTag extends BaseTag /* interfaces *//* interfaces */ {
    
    @Override
    public int doEndTag() throws JspException {
//>> doEndTag


        GridTag parent = (GridTag)findParentWithClass(GridTag.class);


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

    public void setMessages(com.kendoui.taglib.grid.GroupableMessagesTag value) {
        setProperty("messages", value);
    }

    public boolean getEnabled() {
        return (boolean)getProperty("enabled");
    }

    public void setEnabled(boolean value) {
        setProperty("enabled", value);
    }

    public boolean getShowFooter() {
        return (boolean)getProperty("showFooter");
    }

    public void setShowFooter(boolean value) {
        setProperty("showFooter", value);
    }

//<< Attributes

}
