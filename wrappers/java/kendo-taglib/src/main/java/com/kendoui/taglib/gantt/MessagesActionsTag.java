
package com.kendoui.taglib.gantt;


import com.kendoui.taglib.BaseTag;






import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class MessagesActionsTag extends  BaseTag  /* interfaces */ /* interfaces */ {
    
    @Override
    public int doEndTag() throws JspException {
//>> doEndTag


        MessagesTag parent = (MessagesTag)findParentWithClass(MessagesTag.class);


        parent.setActions(this);

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
        return "gantt-messages-actions";
    }

    public java.lang.String getAddChild() {
        return (java.lang.String)getProperty("addChild");
    }

    public void setAddChild(java.lang.String value) {
        setProperty("addChild", value);
    }

    public java.lang.String getAppend() {
        return (java.lang.String)getProperty("append");
    }

    public void setAppend(java.lang.String value) {
        setProperty("append", value);
    }

    public java.lang.String getInsertAfter() {
        return (java.lang.String)getProperty("insertAfter");
    }

    public void setInsertAfter(java.lang.String value) {
        setProperty("insertAfter", value);
    }

    public java.lang.String getInsertBefore() {
        return (java.lang.String)getProperty("insertBefore");
    }

    public void setInsertBefore(java.lang.String value) {
        setProperty("insertBefore", value);
    }

//<< Attributes

}
