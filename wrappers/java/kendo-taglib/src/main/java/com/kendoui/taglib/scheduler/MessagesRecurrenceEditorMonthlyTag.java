
package com.kendoui.taglib.scheduler;


import com.kendoui.taglib.BaseTag;






import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class MessagesRecurrenceEditorMonthlyTag extends  BaseTag  /* interfaces */ /* interfaces */ {
    
    @Override
    public int doEndTag() throws JspException {
//>> doEndTag


        MessagesRecurrenceEditorTag parent = (MessagesRecurrenceEditorTag)findParentWithClass(MessagesRecurrenceEditorTag.class);


        parent.setMonthly(this);

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
        return "scheduler-messages-recurrenceEditor-monthly";
    }

    public java.lang.String getDay() {
        return (java.lang.String)getProperty("day");
    }

    public void setDay(java.lang.String value) {
        setProperty("day", value);
    }

    public java.lang.String getMonths() {
        return (java.lang.String)getProperty("months");
    }

    public void setMonths(java.lang.String value) {
        setProperty("months", value);
    }

    public java.lang.String getRepeatEvery() {
        return (java.lang.String)getProperty("repeatEvery");
    }

    public void setRepeatEvery(java.lang.String value) {
        setProperty("repeatEvery", value);
    }

    public java.lang.String getRepeatOn() {
        return (java.lang.String)getProperty("repeatOn");
    }

    public void setRepeatOn(java.lang.String value) {
        setProperty("repeatOn", value);
    }

//<< Attributes

}
