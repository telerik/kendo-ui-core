
package com.kendoui.taglib.scheduler;


import com.kendoui.taglib.BaseTag;






import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class MessagesRecurrenceEditorEndTag extends  BaseTag  /* interfaces */ /* interfaces */ {
    
    @Override
    public int doEndTag() throws JspException {
//>> doEndTag


        MessagesRecurrenceEditorTag parent = (MessagesRecurrenceEditorTag)findParentWithClass(MessagesRecurrenceEditorTag.class);


        parent.setEnd(this);

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
        return "scheduler-messages-recurrenceEditor-end";
    }

    public java.lang.String getAfter() {
        return (java.lang.String)getProperty("after");
    }

    public void setAfter(java.lang.String value) {
        setProperty("after", value);
    }

    public java.lang.String getLabel() {
        return (java.lang.String)getProperty("label");
    }

    public void setLabel(java.lang.String value) {
        setProperty("label", value);
    }

    public java.lang.String getNever() {
        return (java.lang.String)getProperty("never");
    }

    public void setNever(java.lang.String value) {
        setProperty("never", value);
    }

    public java.lang.String getOccurrence() {
        return (java.lang.String)getProperty("occurrence");
    }

    public void setOccurrence(java.lang.String value) {
        setProperty("occurrence", value);
    }

    public java.lang.String getOn() {
        return (java.lang.String)getProperty("on");
    }

    public void setOn(java.lang.String value) {
        setProperty("on", value);
    }

//<< Attributes

}
