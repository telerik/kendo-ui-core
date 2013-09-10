
package com.kendoui.taglib.scheduler;


import com.kendoui.taglib.BaseTag;






import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class MessagesRecurrenceMessagesTag extends  BaseTag  /* interfaces */ /* interfaces */ {
    
    @Override
    public int doEndTag() throws JspException {
//>> doEndTag


        MessagesTag parent = (MessagesTag)findParentWithClass(MessagesTag.class);


        parent.setRecurrenceMessages(this);

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
        return "scheduler-messages-recurrenceMessages";
    }

    public java.lang.String getDeleteRecurring() {
        return (java.lang.String)getProperty("deleteRecurring");
    }

    public void setDeleteRecurring(java.lang.String value) {
        setProperty("deleteRecurring", value);
    }

    public java.lang.String getDeleteWindowOccurrence() {
        return (java.lang.String)getProperty("deleteWindowOccurrence");
    }

    public void setDeleteWindowOccurrence(java.lang.String value) {
        setProperty("deleteWindowOccurrence", value);
    }

    public java.lang.String getDeleteWindowSeries() {
        return (java.lang.String)getProperty("deleteWindowSeries");
    }

    public void setDeleteWindowSeries(java.lang.String value) {
        setProperty("deleteWindowSeries", value);
    }

    public java.lang.String getDeleteWindowTitle() {
        return (java.lang.String)getProperty("deleteWindowTitle");
    }

    public void setDeleteWindowTitle(java.lang.String value) {
        setProperty("deleteWindowTitle", value);
    }

    public java.lang.String getEditRecurring() {
        return (java.lang.String)getProperty("editRecurring");
    }

    public void setEditRecurring(java.lang.String value) {
        setProperty("editRecurring", value);
    }

    public java.lang.String getEditWindowOccurrence() {
        return (java.lang.String)getProperty("editWindowOccurrence");
    }

    public void setEditWindowOccurrence(java.lang.String value) {
        setProperty("editWindowOccurrence", value);
    }

    public java.lang.String getEditWindowSeries() {
        return (java.lang.String)getProperty("editWindowSeries");
    }

    public void setEditWindowSeries(java.lang.String value) {
        setProperty("editWindowSeries", value);
    }

    public java.lang.String getEditWindowTitle() {
        return (java.lang.String)getProperty("editWindowTitle");
    }

    public void setEditWindowTitle(java.lang.String value) {
        setProperty("editWindowTitle", value);
    }

//<< Attributes

}
