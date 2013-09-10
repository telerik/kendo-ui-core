
package com.kendoui.taglib.scheduler;


import com.kendoui.taglib.BaseTag;






import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class MessagesRecurrenceEditorTag extends  BaseTag  /* interfaces */ /* interfaces */ {
    
    @Override
    public int doEndTag() throws JspException {
//>> doEndTag


        MessagesTag parent = (MessagesTag)findParentWithClass(MessagesTag.class);


        parent.setRecurrenceEditor(this);

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
        return "scheduler-messages-recurrenceEditor";
    }

    public void setDaily(com.kendoui.taglib.scheduler.MessagesRecurrenceEditorDailyTag value) {
        setProperty("daily", value);
    }

    public void setEnd(com.kendoui.taglib.scheduler.MessagesRecurrenceEditorEndTag value) {
        setProperty("end", value);
    }

    public void setFrequencies(com.kendoui.taglib.scheduler.MessagesRecurrenceEditorFrequenciesTag value) {
        setProperty("frequencies", value);
    }

    public void setMonthly(com.kendoui.taglib.scheduler.MessagesRecurrenceEditorMonthlyTag value) {
        setProperty("monthly", value);
    }

    public void setOffsetPositions(com.kendoui.taglib.scheduler.MessagesRecurrenceEditorOffsetPositionsTag value) {
        setProperty("offsetPositions", value);
    }

    public void setWeekly(com.kendoui.taglib.scheduler.MessagesRecurrenceEditorWeeklyTag value) {
        setProperty("weekly", value);
    }

    public void setYearly(com.kendoui.taglib.scheduler.MessagesRecurrenceEditorYearlyTag value) {
        setProperty("yearly", value);
    }

//<< Attributes

}
