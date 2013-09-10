
package com.kendoui.taglib.scheduler;


import com.kendoui.taglib.BaseTag;






import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class MessagesRecurrenceEditorFrequenciesTag extends  BaseTag  /* interfaces */ /* interfaces */ {
    
    @Override
    public int doEndTag() throws JspException {
//>> doEndTag


        MessagesRecurrenceEditorTag parent = (MessagesRecurrenceEditorTag)findParentWithClass(MessagesRecurrenceEditorTag.class);


        parent.setFrequencies(this);

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
        return "scheduler-messages-recurrenceEditor-frequencies";
    }

    public java.lang.String getDaily() {
        return (java.lang.String)getProperty("daily");
    }

    public void setDaily(java.lang.String value) {
        setProperty("daily", value);
    }

    public java.lang.String getMonthly() {
        return (java.lang.String)getProperty("monthly");
    }

    public void setMonthly(java.lang.String value) {
        setProperty("monthly", value);
    }

    public java.lang.String getNever() {
        return (java.lang.String)getProperty("never");
    }

    public void setNever(java.lang.String value) {
        setProperty("never", value);
    }

    public java.lang.String getWeekly() {
        return (java.lang.String)getProperty("weekly");
    }

    public void setWeekly(java.lang.String value) {
        setProperty("weekly", value);
    }

    public java.lang.String getYearly() {
        return (java.lang.String)getProperty("yearly");
    }

    public void setYearly(java.lang.String value) {
        setProperty("yearly", value);
    }

//<< Attributes

}
