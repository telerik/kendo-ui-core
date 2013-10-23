
package com.kendoui.taglib.scheduler;


import com.kendoui.taglib.BaseTag;






import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class MessagesRecurrenceEditorWeekdaysTag extends  BaseTag  /* interfaces */ /* interfaces */ {
    
    @Override
    public int doEndTag() throws JspException {
//>> doEndTag


        MessagesRecurrenceEditorTag parent = (MessagesRecurrenceEditorTag)findParentWithClass(MessagesRecurrenceEditorTag.class);


        parent.setWeekdays(this);

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
        return "scheduler-messages-recurrenceEditor-weekdays";
    }

    public java.lang.String getDay() {
        return (java.lang.String)getProperty("day");
    }

    public void setDay(java.lang.String value) {
        setProperty("day", value);
    }

    public java.lang.String getWeekday() {
        return (java.lang.String)getProperty("weekday");
    }

    public void setWeekday(java.lang.String value) {
        setProperty("weekday", value);
    }

    public java.lang.String getWeekend() {
        return (java.lang.String)getProperty("weekend");
    }

    public void setWeekend(java.lang.String value) {
        setProperty("weekend", value);
    }

//<< Attributes

}
