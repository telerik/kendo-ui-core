
package com.kendoui.taglib.scheduler;


import com.kendoui.taglib.BaseTag;






import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class MessagesRecurrenceEditorYearlyTag extends  BaseTag  /* interfaces */ /* interfaces */ {
    
    @Override
    public int doEndTag() throws JspException {
//>> doEndTag


        MessagesRecurrenceEditorTag parent = (MessagesRecurrenceEditorTag)findParentWithClass(MessagesRecurrenceEditorTag.class);


        parent.setYearly(this);

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
        return "scheduler-messages-recurrenceEditor-yearly";
    }

    public java.lang.String getOf() {
        return (java.lang.String)getProperty("of");
    }

    public void setOf(java.lang.String value) {
        setProperty("of", value);
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

    public java.lang.String getYears() {
        return (java.lang.String)getProperty("years");
    }

    public void setYears(java.lang.String value) {
        setProperty("years", value);
    }

//<< Attributes

}
