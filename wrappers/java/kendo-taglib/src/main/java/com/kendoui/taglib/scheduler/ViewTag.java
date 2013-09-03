
package com.kendoui.taglib.scheduler;


import com.kendoui.taglib.BaseTag;






import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class ViewTag extends  BaseTag  /* interfaces */ /* interfaces */ {
    
    @Override
    public int doEndTag() throws JspException {
//>> doEndTag

        ViewsTag parent = (ViewsTag)findParentWithClass(ViewsTag.class);

        parent.addView(this);

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
        return "scheduler-view";
    }

    public void setEditable(com.kendoui.taglib.scheduler.ViewEditableTag value) {
        setProperty("editable", value);
    }

    public void setGroup(com.kendoui.taglib.scheduler.ViewGroupTag value) {
        setProperty("group", value);
    }

    public void setAllDayEventTemplate(ViewAllDayEventTemplateFunctionTag value) {
        setEvent("allDayEventTemplate", value.getBody());
    }

    public void setDateHeaderTemplate(ViewDateHeaderTemplateFunctionTag value) {
        setEvent("dateHeaderTemplate", value.getBody());
    }

    public void setDayTemplate(ViewDayTemplateFunctionTag value) {
        setEvent("dayTemplate", value.getBody());
    }

    public void setEventTemplate(ViewEventTemplateFunctionTag value) {
        setEvent("eventTemplate", value.getBody());
    }

    public void setEventTimeTemplate(ViewEventTimeTemplateFunctionTag value) {
        setEvent("eventTimeTemplate", value.getBody());
    }

    public void setMajorTimeHeaderTemplate(ViewMajorTimeHeaderTemplateFunctionTag value) {
        setEvent("majorTimeHeaderTemplate", value.getBody());
    }

    public void setMinorTimeHeaderTemplate(ViewMinorTimeHeaderTemplateFunctionTag value) {
        setEvent("minorTimeHeaderTemplate", value.getBody());
    }

    public java.lang.String getAllDayEventTemplate() {
        return (java.lang.String)getProperty("allDayEventTemplate");
    }

    public void setAllDayEventTemplate(java.lang.String value) {
        setProperty("allDayEventTemplate", value);
    }

    public boolean getAllDaySlot() {
        return (boolean)getProperty("allDaySlot");
    }

    public void setAllDaySlot(boolean value) {
        setProperty("allDaySlot", value);
    }

    public java.lang.String getDateHeaderTemplate() {
        return (java.lang.String)getProperty("dateHeaderTemplate");
    }

    public void setDateHeaderTemplate(java.lang.String value) {
        setProperty("dateHeaderTemplate", value);
    }

    public java.lang.String getDayTemplate() {
        return (java.lang.String)getProperty("dayTemplate");
    }

    public void setDayTemplate(java.lang.String value) {
        setProperty("dayTemplate", value);
    }

    public boolean getEditable() {
        return (boolean)getProperty("editable");
    }

    public void setEditable(boolean value) {
        setProperty("editable", value);
    }

    public java.util.Date getEndTime() {
        return (java.util.Date)getProperty("endTime");
    }

    public void setEndTime(java.util.Date value) {
        setProperty("endTime", value);
    }

    public float getEventHeight() {
        return (float)getProperty("eventHeight");
    }

    public void setEventHeight(float value) {
        setProperty("eventHeight", value);
    }

    public java.lang.String getEventTemplate() {
        return (java.lang.String)getProperty("eventTemplate");
    }

    public void setEventTemplate(java.lang.String value) {
        setProperty("eventTemplate", value);
    }

    public java.lang.String getEventTimeTemplate() {
        return (java.lang.String)getProperty("eventTimeTemplate");
    }

    public void setEventTimeTemplate(java.lang.String value) {
        setProperty("eventTimeTemplate", value);
    }

    public float getMajorTick() {
        return (float)getProperty("majorTick");
    }

    public void setMajorTick(float value) {
        setProperty("majorTick", value);
    }

    public java.lang.String getMajorTimeHeaderTemplate() {
        return (java.lang.String)getProperty("majorTimeHeaderTemplate");
    }

    public void setMajorTimeHeaderTemplate(java.lang.String value) {
        setProperty("majorTimeHeaderTemplate", value);
    }

    public float getMinorTickCount() {
        return (float)getProperty("minorTickCount");
    }

    public void setMinorTickCount(float value) {
        setProperty("minorTickCount", value);
    }

    public java.lang.String getMinorTimeHeaderTemplate() {
        return (java.lang.String)getProperty("minorTimeHeaderTemplate");
    }

    public void setMinorTimeHeaderTemplate(java.lang.String value) {
        setProperty("minorTimeHeaderTemplate", value);
    }

    public boolean getSelected() {
        return (boolean)getProperty("selected");
    }

    public void setSelected(boolean value) {
        setProperty("selected", value);
    }

    public java.lang.String getSelectedDateFormat() {
        return (java.lang.String)getProperty("selectedDateFormat");
    }

    public void setSelectedDateFormat(java.lang.String value) {
        setProperty("selectedDateFormat", value);
    }

    public java.util.Date getStartTime() {
        return (java.util.Date)getProperty("startTime");
    }

    public void setStartTime(java.util.Date value) {
        setProperty("startTime", value);
    }

    public java.lang.String getTitle() {
        return (java.lang.String)getProperty("title");
    }

    public void setTitle(java.lang.String value) {
        setProperty("title", value);
    }

    public java.lang.String getType() {
        return (java.lang.String)getProperty("type");
    }

    public void setType(java.lang.String value) {
        setProperty("type", value);
    }

//<< Attributes

}
