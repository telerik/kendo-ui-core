
package com.kendoui.taglib.scheduler;


import com.kendoui.taglib.BaseTag;



import com.kendoui.taglib.SchedulerTag;




import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class MessagesTag extends  BaseTag  /* interfaces */ /* interfaces */ {
    
    @Override
    public int doEndTag() throws JspException {
//>> doEndTag


        SchedulerTag parent = (SchedulerTag)findParentWithClass(SchedulerTag.class);


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
        return "scheduler-messages";
    }

    public void setEditor(com.kendoui.taglib.scheduler.MessagesEditorTag value) {
        setProperty("editor", value);
    }

    public void setRecurrenceEditor(com.kendoui.taglib.scheduler.MessagesRecurrenceEditorTag value) {
        setProperty("recurrenceEditor", value);
    }

    public void setRecurrenceMessages(com.kendoui.taglib.scheduler.MessagesRecurrenceMessagesTag value) {
        setProperty("recurrenceMessages", value);
    }

    public void setViews(com.kendoui.taglib.scheduler.MessagesViewsTag value) {
        setProperty("views", value);
    }

    public java.lang.String getAllDay() {
        return (java.lang.String)getProperty("allDay");
    }

    public void setAllDay(java.lang.String value) {
        setProperty("allDay", value);
    }

    public java.lang.String getCancel() {
        return (java.lang.String)getProperty("cancel");
    }

    public void setCancel(java.lang.String value) {
        setProperty("cancel", value);
    }

    public java.lang.String getDate() {
        return (java.lang.String)getProperty("date");
    }

    public void setDate(java.lang.String value) {
        setProperty("date", value);
    }

    public java.lang.String getDeleteWindowTitle() {
        return (java.lang.String)getProperty("deleteWindowTitle");
    }

    public void setDeleteWindowTitle(java.lang.String value) {
        setProperty("deleteWindowTitle", value);
    }

    public java.lang.String getDestroy() {
        return (java.lang.String)getProperty("destroy");
    }

    public void setDestroy(java.lang.String value) {
        setProperty("destroy", value);
    }

    public java.lang.String getEvent() {
        return (java.lang.String)getProperty("event");
    }

    public void setEvent(java.lang.String value) {
        setProperty("event", value);
    }

    public java.lang.String getSave() {
        return (java.lang.String)getProperty("save");
    }

    public void setSave(java.lang.String value) {
        setProperty("save", value);
    }

    public java.lang.String getShowFullDay() {
        return (java.lang.String)getProperty("showFullDay");
    }

    public void setShowFullDay(java.lang.String value) {
        setProperty("showFullDay", value);
    }

    public java.lang.String getShowWorkDay() {
        return (java.lang.String)getProperty("showWorkDay");
    }

    public void setShowWorkDay(java.lang.String value) {
        setProperty("showWorkDay", value);
    }

    public java.lang.String getTime() {
        return (java.lang.String)getProperty("time");
    }

    public void setTime(java.lang.String value) {
        setProperty("time", value);
    }

    public java.lang.String getToday() {
        return (java.lang.String)getProperty("today");
    }

    public void setToday(java.lang.String value) {
        setProperty("today", value);
    }

//<< Attributes

}
