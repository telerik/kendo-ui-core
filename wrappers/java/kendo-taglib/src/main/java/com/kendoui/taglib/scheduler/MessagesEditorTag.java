
package com.kendoui.taglib.scheduler;


import com.kendoui.taglib.BaseTag;






import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class MessagesEditorTag extends  BaseTag  /* interfaces */ /* interfaces */ {
    
    @Override
    public int doEndTag() throws JspException {
//>> doEndTag


        MessagesTag parent = (MessagesTag)findParentWithClass(MessagesTag.class);


        parent.setEditor(this);

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
        return "scheduler-messages-editor";
    }

    public java.lang.String getAllDayEvent() {
        return (java.lang.String)getProperty("allDayEvent");
    }

    public void setAllDayEvent(java.lang.String value) {
        setProperty("allDayEvent", value);
    }

    public java.lang.String getDescription() {
        return (java.lang.String)getProperty("description");
    }

    public void setDescription(java.lang.String value) {
        setProperty("description", value);
    }

    public java.lang.String getEditorTitle() {
        return (java.lang.String)getProperty("editorTitle");
    }

    public void setEditorTitle(java.lang.String value) {
        setProperty("editorTitle", value);
    }

    public java.lang.String getEnd() {
        return (java.lang.String)getProperty("end");
    }

    public void setEnd(java.lang.String value) {
        setProperty("end", value);
    }

    public java.lang.String getEndTimezone() {
        return (java.lang.String)getProperty("endTimezone");
    }

    public void setEndTimezone(java.lang.String value) {
        setProperty("endTimezone", value);
    }

    public java.lang.String getRepeat() {
        return (java.lang.String)getProperty("repeat");
    }

    public void setRepeat(java.lang.String value) {
        setProperty("repeat", value);
    }

    public java.lang.String getSeparateTimezones() {
        return (java.lang.String)getProperty("separateTimezones");
    }

    public void setSeparateTimezones(java.lang.String value) {
        setProperty("separateTimezones", value);
    }

    public java.lang.String getStart() {
        return (java.lang.String)getProperty("start");
    }

    public void setStart(java.lang.String value) {
        setProperty("start", value);
    }

    public java.lang.String getStartTimezone() {
        return (java.lang.String)getProperty("startTimezone");
    }

    public void setStartTimezone(java.lang.String value) {
        setProperty("startTimezone", value);
    }

    public java.lang.String getTimezone() {
        return (java.lang.String)getProperty("timezone");
    }

    public void setTimezone(java.lang.String value) {
        setProperty("timezone", value);
    }

    public java.lang.String getTimezoneEditorButton() {
        return (java.lang.String)getProperty("timezoneEditorButton");
    }

    public void setTimezoneEditorButton(java.lang.String value) {
        setProperty("timezoneEditorButton", value);
    }

    public java.lang.String getTimezoneEditorTitle() {
        return (java.lang.String)getProperty("timezoneEditorTitle");
    }

    public void setTimezoneEditorTitle(java.lang.String value) {
        setProperty("timezoneEditorTitle", value);
    }

    public java.lang.String getTitle() {
        return (java.lang.String)getProperty("title");
    }

    public void setTitle(java.lang.String value) {
        setProperty("title", value);
    }

//<< Attributes

}
