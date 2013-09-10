
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

    public java.lang.String getEndCountAfter() {
        return (java.lang.String)getProperty("endCountAfter");
    }

    public void setEndCountAfter(java.lang.String value) {
        setProperty("endCountAfter", value);
    }

    public java.lang.String getEndCountOccurrence() {
        return (java.lang.String)getProperty("endCountOccurrence");
    }

    public void setEndCountOccurrence(java.lang.String value) {
        setProperty("endCountOccurrence", value);
    }

    public java.lang.String getEndLabel() {
        return (java.lang.String)getProperty("endLabel");
    }

    public void setEndLabel(java.lang.String value) {
        setProperty("endLabel", value);
    }

    public java.lang.String getEndNever() {
        return (java.lang.String)getProperty("endNever");
    }

    public void setEndNever(java.lang.String value) {
        setProperty("endNever", value);
    }

    public java.lang.String getEndUntilOn() {
        return (java.lang.String)getProperty("endUntilOn");
    }

    public void setEndUntilOn(java.lang.String value) {
        setProperty("endUntilOn", value);
    }

//<< Attributes

}
