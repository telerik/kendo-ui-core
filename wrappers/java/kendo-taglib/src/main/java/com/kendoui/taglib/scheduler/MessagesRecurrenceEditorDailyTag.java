
package com.kendoui.taglib.scheduler;


import com.kendoui.taglib.BaseTag;






import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class MessagesRecurrenceEditorDailyTag extends  BaseTag  /* interfaces */ /* interfaces */ {
    
    @Override
    public int doEndTag() throws JspException {
//>> doEndTag


        MessagesRecurrenceEditorTag parent = (MessagesRecurrenceEditorTag)findParentWithClass(MessagesRecurrenceEditorTag.class);


        parent.setDaily(this);

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
        return "scheduler-messages-recurrenceEditor-daily";
    }

    public java.lang.String getDays() {
        return (java.lang.String)getProperty("days");
    }

    public void setDays(java.lang.String value) {
        setProperty("days", value);
    }

    public java.lang.String getRepeatEvery() {
        return (java.lang.String)getProperty("repeatEvery");
    }

    public void setRepeatEvery(java.lang.String value) {
        setProperty("repeatEvery", value);
    }

//<< Attributes

}
